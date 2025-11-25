# PLAN STRATÉGIQUE & TECHNIQUE - PROJET JFK

## 1. Contexte & Objectifs

Le projet consiste à développer la plateforme de campagne pour Jean-François Kouassi (JFK).

**Objectifs clés :**
- **Visibilité (SEO)** : Indexation parfaite et partage social optimisé (Côte d'Ivoire)
- **Sécurité** : Backend robuste et sécurisé dès le départ
- **UX/UI** : Design moderne, rassurant et professionnel (Thème : Santé, Innovation, Unité)
- **Architecture** : Codebase propre, modulaire et maintenable (Monorepo Turborepo)
- **Performance** : Temps de chargement optimal, même en 3G

---

## 2. Architecture Technique

### 2.1 Monorepo (Turborepo + pnpm)

```
JFK/
├── apps/
│   ├── web/          # Frontend Next.js 16 (App Router)
│   ├── api/          # Backend NestJS
│   └── docs/         # Documentation (optionnel)
├── packages/
│   ├── ui/           # Composants partagés
│   ├── eslint-config/
│   └── typescript-config/
└── turbo.json
```

### 2.2 Stack Technique

**Frontend :**
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v3
- shadcn/ui + daisyUI
- Framer Motion (animations)
- React Hook Form + Zod (formulaires)

**Backend :**
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger (documentation)

**DevOps :**
- Git (version control)
- pnpm (package manager)
- Vercel (frontend deployment)
- Railway/Render (backend deployment)

---

## 3. Plan d'Action Détaillé

### ✅ Phase 0 : Setup Initial (TERMINÉ)

**Objectif :** Préparer l'environnement de développement

- [x] Initialiser le monorepo Turborepo
- [x] Créer l'application NestJS dans `apps/api`
- [x] Nettoyer le frontend (supprimer boilerplate)
- [x] Installer les dépendances de sécurité backend (helmet, cors, throttler)
- [x] Installer les dépendances frontend (shadcn/ui, framer-motion, etc.)
- [x] Configurer Tailwind CSS v3
- [x] Créer utility function `cn()`

---

### 📋 Phase 1 : Configuration & Infrastructure

**Objectif :** Mettre en place la configuration et la base de données

#### 1.1 Configuration Backend

- [ ] Créer le fichier `.env.example` avec toutes les variables
- [ ] Configurer `@nestjs/config` avec validation Joi
- [ ] Créer `src/config/` avec les modules de configuration :
  - `database.config.ts`
  - `jwt.config.ts`
  - `app.config.ts`
- [ ] Configurer les variables d'environnement par environnement (dev, staging, prod)

**Variables d'environnement requises :**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jfk_db"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# App
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"

# Email (pour plus tard)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
```

#### 1.2 Base de Données (Prisma)

- [ ] Initialiser Prisma : `npx prisma init`
- [ ] Créer le schéma Prisma initial dans `prisma/schema.prisma`
- [ ] Définir les modèles de base :
  - `User` (pour l'admin)
  - `Adherent` (pour les adhésions)
  - `Event` (événements de campagne)
  - `Article` (actualités)
- [ ] Créer la première migration : `npx prisma migrate dev --name init`
- [ ] Générer le client Prisma : `npx prisma generate`
- [ ] Créer le module Prisma dans NestJS (`src/prisma/`)

**Schéma Prisma initial :**
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Adherent {
  id        String   @id @default(uuid())
  firstName String
  lastName  String
  email     String   @unique
  phone     String
  location  String?
  createdAt DateTime @default(now())
}

enum Role {
  ADMIN
  MODERATOR
}
```

#### 1.3 Documentation API (Swagger)

- [ ] Configurer Swagger dans `main.ts`
- [ ] Ajouter les décorateurs `@ApiTags`, `@ApiOperation` sur les controllers
- [ ] Documenter tous les DTOs avec `@ApiProperty`
- [ ] Tester l'accès à `/api/docs`

---

### 🔐 Phase 2 : Authentification & Autorisation

**Objectif :** Sécuriser l'API avec JWT

#### 2.1 Installation des dépendances

```bash
pnpm --filter api add @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
pnpm --filter api add -D @types/passport-jwt @types/bcrypt
```

#### 2.2 Module Auth

- [ ] Créer le module Auth : `nest g module auth`
- [ ] Créer le service Auth : `nest g service auth`
- [ ] Créer le controller Auth : `nest g controller auth`
- [ ] Implémenter les DTOs :
  - `LoginDto`
  - `RegisterDto`
- [ ] Implémenter les méthodes :
  - `register()` : créer un admin
  - `login()` : authentification JWT
  - `validateUser()` : vérifier les credentials
- [ ] Créer les strategies Passport :
  - `JwtStrategy`
  - `LocalStrategy`
- [ ] Créer les guards :
  - `JwtAuthGuard`
  - `RolesGuard`

#### 2.3 Protection des routes

- [ ] Protéger les routes admin avec `@UseGuards(JwtAuthGuard)`
- [ ] Implémenter le décorateur `@Roles()`
- [ ] Tester l'authentification avec Postman/Insomnia

---

### 📊 Phase 3 : Modules Métier Backend

**Objectif :** Créer les modules fonctionnels

#### 3.1 Module Adherents

- [ ] Créer le module : `nest g resource adherents`
- [ ] Créer les DTOs :
  - `CreateAdherentDto`
  - `UpdateAdherentDto`
  - `FilterAdherentDto`
- [ ] Implémenter les endpoints :
  - `POST /adherents` : créer une adhésion (public)
  - `GET /adherents` : lister les adhérents (admin)
  - `GET /adherents/:id` : voir un adhérent (admin)
  - `DELETE /adherents/:id` : supprimer (admin)
- [ ] Ajouter la validation avec class-validator
- [ ] Implémenter la pagination
- [ ] Ajouter les filtres de recherche

#### 3.2 Module Events (optionnel pour v1)

- [ ] Créer le module : `nest g resource events`
- [ ] Créer les DTOs
- [ ] Implémenter CRUD complet
- [ ] Ajouter upload d'images (Multer)

#### 3.3 Module Articles (optionnel pour v1)

- [ ] Créer le module : `nest g resource articles`
- [ ] Créer les DTOs
- [ ] Implémenter CRUD complet
- [ ] Ajouter système de catégories

---

### 🎨 Phase 4 : Frontend UI & Intégration

**Objectif :** Développer l'interface utilisateur

> **Note :** Cette phase sera développée par vous-même.
> Vous utiliserez les composants shadcn/ui, daisyUI, et Framer Motion pour créer l'interface.

**Composants suggérés à créer :**
- Header avec navigation
- Hero section
- Section statistiques
- Section vision/programme
- Formulaire d'adhésion
- Footer
- Pages : Accueil, À propos, Programme, Actualités, Contact

---

### 🔗 Phase 5 : Intégration Frontend-Backend

**Objectif :** Connecter le frontend à l'API

#### 5.1 Configuration API Client

- [ ] Créer `lib/api.ts` avec axios ou fetch
- [ ] Configurer les intercepteurs pour les erreurs
- [ ] Créer les types TypeScript depuis les DTOs backend

#### 5.2 Formulaire d'Adhésion

- [ ] Créer le composant avec React Hook Form + Zod
- [ ] Valider côté client
- [ ] Envoyer à l'API `POST /adherents`
- [ ] Afficher les notifications de succès/erreur (Sonner)
- [ ] Ajouter animations de chargement

#### 5.3 Pages Dynamiques (si applicable)

- [ ] Page événements : fetch depuis `GET /events`
- [ ] Page actualités : fetch depuis `GET /articles`
- [ ] Implémenter ISR (Incremental Static Regeneration)

---

### ✅ Phase 6 : Tests & Qualité

**Objectif :** Assurer la qualité du code

#### 6.1 Tests Backend

- [ ] Tests unitaires des services (Jest)
- [ ] Tests e2e des endpoints (Supertest)
- [ ] Coverage minimum 70%

#### 6.2 Tests Frontend

- [ ] Tests des composants critiques
- [ ] Tests des formulaires
- [ ] Tests d'accessibilité

#### 6.3 Linting & Formatting

- [ ] Configurer ESLint strict
- [ ] Configurer Prettier
- [ ] Ajouter pre-commit hooks (Husky)

---

### 🚀 Phase 7 : Optimisation & Performance

**Objectif :** Maximiser les performances

#### 7.1 Frontend

- [ ] Optimiser les images (Sharp, next/image)
- [ ] Lazy loading des composants
- [ ] Code splitting
- [ ] Audit Lighthouse (score > 90)
- [ ] Optimiser les Core Web Vitals :
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

#### 7.2 Backend

- [ ] Implémenter le caching (Redis optionnel)
- [ ] Optimiser les requêtes Prisma
- [ ] Ajouter les index sur la DB
- [ ] Compression des réponses (gzip)

#### 7.3 SEO

- [ ] Vérifier les meta tags
- [ ] Générer sitemap.xml
- [ ] Créer robots.txt
- [ ] Tester les Open Graph tags
- [ ] Soumettre à Google Search Console

---

### 📦 Phase 8 : Déploiement

**Objectif :** Mettre en production

#### 8.1 Préparation

- [ ] Créer les fichiers de configuration :
  - `vercel.json` (frontend)
  - `Dockerfile` (backend - optionnel)
- [ ] Configurer les variables d'environnement production
- [ ] Créer la base de données production

#### 8.2 Déploiement Frontend (Vercel)

- [ ] Connecter le repo GitHub à Vercel
- [ ] Configurer les variables d'environnement
- [ ] Déployer sur Vercel
- [ ] Configurer le domaine personnalisé

#### 8.3 Déploiement Backend (Railway/Render)

- [ ] Créer le projet sur Railway/Render
- [ ] Configurer PostgreSQL
- [ ] Configurer les variables d'environnement
- [ ] Déployer l'API
- [ ] Tester les endpoints en production

#### 8.4 Monitoring

- [ ] Configurer Vercel Analytics
- [ ] Configurer Sentry (error tracking)
- [ ] Mettre en place les logs (Winston)

---

## 4. Checklist de Production

Avant de lancer en production, vérifier :

### Sécurité
- [ ] HTTPS activé
- [ ] CORS configuré correctement
- [ ] Rate limiting actif
- [ ] Variables sensibles dans .env (pas dans le code)
- [ ] Helmet configuré
- [ ] Validation des inputs partout

### Performance
- [ ] Score Lighthouse > 90
- [ ] Images optimisées
- [ ] Caching configuré
- [ ] Compression activée

### SEO
- [ ] Meta tags présents
- [ ] Open Graph configuré
- [ ] Sitemap généré
- [ ] robots.txt créé

### Fonctionnel
- [ ] Formulaires testés
- [ ] Emails de confirmation fonctionnels
- [ ] Responsive sur mobile/tablet/desktop
- [ ] Tests e2e passent

---

## 5. Maintenance & Évolutions

### Évolutions futures possibles

- Système de newsletter
- Espace adhérent (dashboard)
- Système de dons en ligne
- Blog/Actualités avec CMS
- Galerie photos/vidéos
- Carte interactive des adhérents
- Système de bénévolat
- Application mobile (React Native)

---

**Date de création :** 25 novembre 2024  
**Dernière mise à jour :** 25 novembre 2024  
**Version :** 2.0
