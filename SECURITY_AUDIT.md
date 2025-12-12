# 🔒 Audit de Sécurité Auth - Entreprise Ready

**Date**: 2025-01-XX  
**Statut**: ⚠️ **NON PRÊT POUR PRODUCTION** - Failles critiques détectées

---

## 🚨 Failles Critiques (À corriger IMMÉDIATEMENT)

### 1. **Refresh Tokens Non Stockés** ⚠️ CRITIQUE
**Problème**: Les refresh tokens sont générés mais jamais stockés en DB. Impossible de :
- Les invalider (logout, changement de mot de passe)
- Détecter la réutilisation (token volé)
- Gérer la rotation
- Révoquer tous les tokens d'un utilisateur

**Impact**: Si un refresh token est volé, il reste valide jusqu'à expiration (potentiellement 7-30 jours).

**Solution**:
```prisma
model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique // Hashé avec SHA-256
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  revoked   Boolean  @default(false)
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  
  @@index([userId])
  @@index([expiresAt])
  @@index([token])
}
```

**Actions**:
- Créer migration Prisma pour `RefreshToken`
- Modifier `generateTokens()` pour stocker le refresh token hashé
- Implémenter `refresh()` avec vérification DB + rotation
- Implémenter `logout()` pour révoquer le token
- Nettoyer les tokens expirés (cron job)

---

### 2. **Pas de Rate Limiting Spécifique sur Auth** ⚠️ CRITIQUE
**Problème**: Throttler global (100 req/min) est trop permissif pour `/login` et `/register`. Risque de brute force.

**Impact**: Attaquant peut tenter 100 mots de passe par minute = 6000/heure.

**Solution**:
```typescript
// auth.controller.ts
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 tentatives/min
@Post('login')
async login(@Body() dto: LoginDto) { ... }

@Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 tentatives/min
@Post('register')
async register(@Body() dto: RegisterDto) { ... }

@Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 tentatives/5min
@Post('forgot-password')
async forgotPassword(@Body() dto: ForgotPasswordDto) { ... }
```

**Actions**:
- Ajouter `@Throttle` sur tous les endpoints auth
- Implémenter rate limiting par IP + email (Redis recommandé pour prod)
- Logger les tentatives échouées pour détection d'attaques

---

### 3. **Timing Attack sur Login** ⚠️ CRITIQUE
**Problème**: Le code compare le mot de passe même si l'utilisateur n'existe pas, révélant l'existence d'un email.

**Code actuel**:
```typescript
const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
if (!user) throw new UnauthorizedException('Identifiants invalides');
const passwordValid = await bcrypt.compare(dto.password, user.password);
```

**Impact**: Attaquant peut découvrir quels emails sont enregistrés.

**Solution**:
```typescript
async login(dto: LoginDto) {
  const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
  
  // Toujours hasher pour éviter timing attack
  const fakeHash = '$2b$10$fakehashforsecurity';
  const hashToCompare = user?.password || fakeHash;
  
  // Comparaison constante en temps
  const passwordValid = await bcrypt.compare(dto.password, hashToCompare);
  
  if (!user || !passwordValid) {
    // Délai constant pour éviter timing attack
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new UnauthorizedException('Identifiants invalides');
  }
  // ...
}
```

**Actions**:
- Implémenter comparaison constante en temps
- Logger les tentatives échouées (sans révéler si email existe)

---

### 4. **Pas de Blacklist de Tokens** ⚠️ CRITIQUE
**Problème**: Impossible d'invalider un token avant expiration (logout, changement de mot de passe, révocation admin).

**Impact**: Token volé reste valide jusqu'à expiration (potentiellement 15min-1h).

**Solution**:
```typescript
// Créer table RefreshToken avec champ `revoked`
// Pour access tokens, utiliser Redis avec TTL = expiration du token

// jwt.strategy.ts
async validate(payload: JwtPayload) {
  // Vérifier si token est blacklisté (Redis)
  const isBlacklisted = await this.redis.get(`blacklist:${payload.jti}`);
  if (isBlacklisted) {
    throw new UnauthorizedException('Token revoked');
  }
  // ...
}

// auth.service.ts
async logout(userId: string, jti: string) {
  const tokenExpiry = this.getTokenExpiry(payload);
  await this.redis.setex(`blacklist:${jti}`, tokenExpiry, '1');
  await this.revokeAllRefreshTokens(userId);
}
```

**Actions**:
- Ajouter `jti` (JWT ID) dans les tokens
- Implémenter blacklist Redis pour access tokens
- Implémenter révocation de refresh tokens en DB

---

### 5. **Pas de Rotation de Refresh Tokens** ⚠️ CRITIQUE
**Problème**: Refresh tokens ne sont pas rotés. Si volé, reste valide jusqu'à expiration.

**Impact**: Token volé = accès illimité jusqu'à expiration (7-30 jours).

**Solution**:
```typescript
async refresh(refreshToken: string) {
  const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const tokenRecord = await this.prisma.refreshToken.findUnique({
    where: { token: hashedToken },
    include: { user: true },
  });
  
  if (!tokenRecord || tokenRecord.revoked || tokenRecord.expiresAt < new Date()) {
    throw new UnauthorizedException('Invalid refresh token');
  }
  
  // RÉVOQUER l'ancien token
  await this.prisma.refreshToken.update({
    where: { id: tokenRecord.id },
    data: { revoked: true },
  });
  
  // GÉNÉRER nouveaux tokens
  const newTokens = await this.generateTokens(...);
  
  return newTokens;
}
```

**Actions**:
- Implémenter rotation à chaque refresh
- Révoquer l'ancien token avant d'en créer un nouveau

---

## ⚠️ Failles Moyennes (À corriger avant prod)

### 6. **Account Enumeration**
**Problème**: Messages d'erreur différents révèlent si un email existe.

**Solution**: Messages identiques pour email existant/non existant (déjà fait partiellement).

---

### 7. **Pas de Protection CSRF**
**Problème**: Pas de tokens CSRF pour les mutations.

**Solution**: Utiliser `@nestjs/csrf` ou cookies `SameSite=Strict` + vérification origin.

---

### 8. **Swagger Accessible en Production**
**Problème**: `/api-docs` accessible sans protection.

**Solution**:
```typescript
if (process.env.NODE_ENV === 'production') {
  // Protéger Swagger avec basic auth ou désactiver
  app.use('/api-docs', basicAuth({ users: { admin: 'secret' } }));
}
```

---

### 9. **Pas de Validation de Force du Secret JWT**
**Problème**: Secret peut être faible (ex: "secret123").

**Solution**:
```typescript
// app.module.ts - validation Joi
JWT_SECRET: Joi.string().min(32).required(), // Minimum 32 caractères
```

---

### 10. **Pas de Logging des Tentatives Échouées**
**Problème**: Pas de tracking pour détecter les attaques.

**Solution**:
```typescript
// Créer table LoginAttempt
model LoginAttempt {
  id        String   @id @default(uuid())
  email     String
  ipAddress String
  success   Boolean
  userAgent String?
  createdAt DateTime @default(now())
  
  @@index([email, createdAt])
  @@index([ipAddress, createdAt])
}
```

---

### 11. **Pas de jti (JWT ID) dans les Tokens**
**Problème**: Impossible de tracker/invalider un token spécifique.

**Solution**:
```typescript
private async generateTokens(userId: string, email: string, role: UserRole) {
  const jti = crypto.randomUUID();
  const payload: JwtPayload = { 
    sub: userId, 
    email, 
    role,
    jti, // Ajouter JWT ID
  };
  // ...
}
```

---

## 📋 Plan d'Action Priorisé

### Phase 1 : Sécurité Critique (URGENT - Avant tout déploiement)
1. ✅ **Créer table RefreshToken** (migration Prisma)
2. ✅ **Implémenter stockage refresh tokens** (hashés)
3. ✅ **Implémenter endpoint `/auth/refresh`** avec rotation
4. ✅ **Implémenter endpoint `/auth/logout`** avec révocation
5. ✅ **Ajouter rate limiting spécifique** sur auth endpoints
6. ✅ **Corriger timing attack** sur login
7. ✅ **Ajouter blacklist Redis** pour access tokens
8. ✅ **Ajouter `jti` dans les tokens**

### Phase 2 : Sécurité Moyenne (Avant production)
9. ✅ **Protéger Swagger** en production
10. ✅ **Valider force du secret JWT** (min 32 chars)
11. ✅ **Implémenter logging des tentatives** (LoginAttempt table)
12. ✅ **Ajouter protection CSRF** (cookies SameSite)

### Phase 3 : Améliorations (Post-MVP)
13. ✅ **Implémenter détection d'anomalies** (tentatives suspectes)
14. ✅ **Ajouter 2FA** (optionnel mais recommandé pour admins)
15. ✅ **Implémenter device fingerprinting** pour détecter nouveaux devices

---

## 🔧 Implémentation Recommandée

### Stack Technique
- **Redis**: Blacklist tokens + rate limiting distribué
- **Prisma**: Table RefreshToken pour persistance
- **@nestjs/throttler**: Rate limiting par endpoint
- **crypto**: Génération jti + hash tokens

### Variables d'Environnement à Ajouter
```env
# Redis pour blacklist + rate limiting
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Sécurité
NODE_ENV=production
JWT_SECRET_MIN_LENGTH=32

# Rate limiting
RATE_LIMIT_LOGIN=5
RATE_LIMIT_REGISTER=3
RATE_LIMIT_FORGOT_PASSWORD=3
```

---

## ✅ Checklist Avant Production

- [ ] Refresh tokens stockés et hashés en DB
- [ ] Endpoint `/auth/refresh` avec rotation
- [ ] Endpoint `/auth/logout` avec révocation
- [ ] Rate limiting spécifique sur tous les endpoints auth
- [ ] Timing attack corrigé sur login
- [ ] Blacklist Redis pour access tokens
- [ ] `jti` ajouté dans tous les tokens
- [ ] Swagger protégé en production
- [ ] Secret JWT validé (min 32 chars)
- [ ] Logging des tentatives de login
- [ ] Protection CSRF activée
- [ ] Tests e2e pour tous les flux auth
- [ ] Documentation sécurité à jour

---

## 📚 Références

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [NestJS Security Best Practices](https://docs.nestjs.com/security/authentication)

---

**Conclusion**: Le système actuel n'est **PAS prêt pour la production**. Les failles critiques (refresh tokens non stockés, pas de blacklist, timing attacks) doivent être corrigées avant tout déploiement.

