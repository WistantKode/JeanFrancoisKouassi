# Rapport d'Audit de Sécurité et d'Architecture - API NestJS

**Date :** 24/05/2024
**Auditeur :** Votre Mentor IA

## 1. Introduction

Conformément à votre demande, j'ai réalisé un audit de l'application backend `apps/api`. L'objectif était d'analyser la sécurité, l'architecture et la qualité du code sans effectuer de modifications, et de produire un rapport avec des recommandations d'amélioration.

**Synthèse générale :** L'application est **très bien structurée** et suit les meilleures pratiques de NestJS. La base est solide, propre et performante. Les points suivants sont des recommandations pour atteindre un niveau de sécurité et de robustesse maximal, comme demandé dans `AI.md`.

---

## 2. Points Forts (Ce qui est déjà excellent)

- **Architecture Modulaire :** La séparation en modules (`Auth`, `Users`, `Prisma`) est claire et facilite la maintenance.
- **Validation des Données :** L'utilisation d'un `ValidationPipe` global avec `whitelist` et `forbidNonWhitelisted` est une excellente pratique pour sécuriser les entrées de l'API.
- **Sécurité de Base :** L'intégration de `Helmet` pour les en-têtes HTTP et de `CORS` est correctement implémentée dans `main.ts`.
- **Protection Anti-Spam :** L'application d'un `Throttler` (rate limiting) global est une mesure de sécurité proactive et bien configurée.
- **Configuration Centralisée :** L'usage de `ConfigModule` pour gérer les variables d'environnement est une approche robuste.

---

## 3. Axes d'Amélioration (Recommandations)

Voici des pistes d'amélioration non-destructives pour renforcer davantage votre application.

### Recommandation 1 : Renforcer la Validation des Variables d'Environnement

**Pourquoi ?**
Actuellement, votre configuration JWT (`auth.module.ts`) utilise un secret de secours (`'fallback-secret'`) si `JWT_SECRET` n'est pas défini. C'est un risque de sécurité majeur en production. De plus, l'URL CORS est codée en dur, ce qui manque de flexibilité.

**Comment ?**
Utilisez un schéma de validation pour vous assurer que toutes les variables d'environnement nécessaires sont présentes au démarrage de l'application. Le `ConfigModule` peut être couplé avec `Joi`, une bibliothèque de validation.

**Exemple (à ajouter dans `app.module.ts`) :**

```typescript
// 1. Installez Joi : pnpm add joi && pnpm add -D @types/joi
// 2. Mettez à jour votre AppModule

import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Ajoute la validation
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        PORT: Joi.number().default(3001),
        CORS_ORIGIN: Joi.string().required(), // Nouvelle variable pour l'origine CORS
      }),
    }),
    // ... autres modules
  ],
  // ...
})
export class AppModule {}
```

### Recommandation 2 : Établir un Typage Strict pour l'Utilisateur Authentifié

**Pourquoi ?**
Dans `users.controller.ts`, l'objet `user` injecté par le décorateur `@CurrentUser` est de type `any`. Cela annule les avantages de TypeScript et crée des failles de sécurité.

**Comment ?**
Définissez une interface pour le payload du JWT et utilisez-la de manière cohérente.

**Exemple :**

1.  **Créez un type pour le payload JWT (par exemple, dans `src/auth/types/jwt-payload.type.ts`) :**

    ```typescript
    import { UserRole } from '@prisma/client';

    export type JwtPayload = {
      sub: string; // 'sub' est le nom standard pour l'ID de l'utilisateur dans un JWT
      email: string;
      role: UserRole;
    };
    ```

2.  **Mettez à jour votre `JwtStrategy` pour qu'il retourne un payload typé.**

3.  **Mettez à jour votre `UsersController` pour utiliser ce type.**

### Recommandation 3 : Renforcer la Politique de Mots de Passe

**Pourquoi ?**
La validation actuelle du mot de passe (`@MinLength(8)`) est un bon début, mais elle n'impose aucune complexité.

**Comment ?**
Utilisez le décorateur `@Matches` de `class-validator` avec une regex pour imposer une politique de mot de passe plus stricte.

**Exemple (à modifier dans `src/auth/dto/register.dto.ts`) :**

```typescript
import { Matches } from 'class-validator';

// ...
@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  message: 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial',
})
password: string;
```

### Recommandation 4 : Affiner le Rate Limiting pour les Endpoints Sensibles

**Pourquoi ?**
Le rate limit global est généreux. Les endpoints d'authentification devraient avoir une limite plus stricte pour prévenir les attaques par force brute.

**Comment ?**
Appliquez un décorateur `@Throttle` spécifique sur les méthodes de votre `AuthController`.

**Exemple (à ajouter dans `src/auth/auth.controller.ts`) :**

```typescript
import { Throttle } from '@nestjs/throttler';

// ...
@Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 tentatives par minute
@Post('login')
//...

@Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 inscriptions par minute
@Post('register')
//...
```

---

## 4. Recommandations Avancées

### Recommandation 5 : Centraliser et Typer la "Sanitization" de l'Utilisateur

**Pourquoi ?**
Les méthodes `sanitizeUser` dans `AuthService` et `UsersService` utilisent `any` et dupliquent la logique de suppression des champs sensibles. Cela augmente le risque d'oublier un champ et rend la maintenance difficile.

**Comment ?**
Créez un DTO de réponse pour l'utilisateur qui utilise l'utilitaire `OmitType` de `@nestjs/swagger` pour exclure les champs sensibles du modèle Prisma. Cela garantit un typage fort et une logique centralisée.

**Exemple :**

1.  **Créez un `UserEntity` basé sur le modèle Prisma (par exemple, dans `src/users/entities/user.entity.ts`) :**

    ```typescript
    // pnpm add @nestjs/swagger
    import { User as PrismaUser } from '@prisma/client';
    import { OmitType } from '@nestjs/swagger';

    // Cette classe représente le modèle complet, utile pour la logique interne
    export class UserEntity implements PrismaUser {
      // Copiez ici tous les champs du modèle Prisma User
      // id: string; email: string; etc.
    }

    // Ce DTO est ce qui sera exposé à l'extérieur.
    // Il omet les champs sensibles de manière explicite et typée.
    export class PublicUserDto extends OmitType(UserEntity, [
      'password',
      'passwordResetToken',
      'verificationToken',
      'lastLoginIp',
    ]) {}
    ```

2.  **Utilisez ce DTO dans vos services :**

    ```typescript
    // Dans auth.service.ts et users.service.ts
    private sanitizeUser(user: UserEntity): PublicUserDto {
      // La logique de suppression est maintenant implicite grâce au type
      const { password, passwordResetToken, verificationToken, lastLoginIp, ...sanitized } = user;
      return sanitized;
    }

    // Les méthodes de service peuvent maintenant retourner un type fort
    async login(dto: LoginDto): Promise<{ user: PublicUserDto; accessToken: string; refreshToken: string }> {
      // ...
    }
    ```

### Recommandation 6 : Prévenir l'Énumération d'Emails

**Pourquoi ?**
Votre endpoint `register` retourne une `ConflictException` (`409 Conflict`) si l'email existe déjà. Un acteur malveillant peut utiliser cette différence de réponse pour deviner quels emails sont enregistrés dans votre base de données.

**Comment ?**
Retournez toujours la même réponse générique, que l'utilisateur soit créé ou non. La bonne pratique est d'envoyer un email de confirmation et de répondre `201 Created` dans tous les cas, en indiquant que "si un compte n'existait pas, il a été créé et un email a été envoyé".

**Exemple (à modifier dans `src/auth/auth.service.ts`) :**

```typescript
async register(dto: RegisterDto) {
  const existingUser = await this.prisma.client.user.findUnique({
    where: { email: dto.email },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.client.user.create({ data: { ... } });

    // TODO: Envoyer un email de bienvenue/confirmation ici
  } else {
    // TODO: Envoyer un email "Quelqu'un a tenté de créer un compte avec votre email"
  }

  // Ne retournez PAS de tokens ou de données utilisateur ici.
  // L'utilisateur doit confirmer son email ou se connecter séparément.
  // Répondez simplement avec un statut indiquant que l'action a été acceptée.
  return { message: 'Registration process started. Please check your email.' };
}
```
*Note : Cette modification a un impact sur le flux d'authentification et doit être planifiée.*

### Recommandation 7 : Typage Strict des DTOs avec les Enums Prisma

**Pourquoi ?**
Dans `UpdateProfileDto`, le champ `gender` est un `string`. Prisma a déjà défini un `Enum` `Gender` dans votre schéma. L'utilisation de l'enum de Prisma garantit que les valeurs sont toujours synchronisées entre votre base de données et votre code.

**Comment ?**
Importez l'enum depuis `@prisma/client` et utilisez-le dans vos DTOs.

**Exemple (à modifier dans `src/users/dto/update-profile.dto.ts`) :**

```typescript
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client'; // Importez l'enum

export class UpdateProfileDto {
  // ... autres champs

  @ApiProperty({ required: false, enum: Gender }) // Utilisez l'enum ici
  @IsEnum(Gender) // Et ici pour la validation
  @IsOptional()
  gender?: Gender; // Le type est maintenant fort
}
```

---

## 5. Conclusion

Votre backend est sur une excellente voie. En appliquant ces recommandations, vous renforcerez la sécurité, améliorerez la maintenabilité et rendrez votre application encore plus robuste face aux menaces courantes, tout en respectant les objectifs de rigueur définis dans vos documents de projet.
