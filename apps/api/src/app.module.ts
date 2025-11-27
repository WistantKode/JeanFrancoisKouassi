/**
 * @file app.module.ts
 * @description Module racine de l'application.
 * Ce module est le point central qui assemble tous les autres modules (fonctionnalités,
 * configuration, base de données) et configure les services globaux comme la
 * protection anti-spam (Throttler).
 */

import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  /**
   * `imports`: Liste des modules externes dont ce module a besoin.
   * L'ordre est important pour les configurations.
   */
  imports: [
    /**
     * `ConfigModule`: Gère les variables d'environnement de manière centralisée.
     * - `isGlobal: true`: Rend le `ConfigService` disponible dans toute l'application.
     * - `validationSchema`: Utilise Joi pour valider que les variables d'environnement
     *   critiques sont bien définies au démarrage, évitant les erreurs en production.
     */
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        PORT: Joi.number().default(3001),
        CORS_ORIGIN: Joi.string().required(),
      }),
    }),

    /**
     * `ThrottlerModule`: Configure le rate limiting (limitation de requêtes) pour
     * prévenir les attaques par force brute et le spam.
     * Ici, une limite globale de 100 requêtes par minute est définie.
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute en millisecondes
        limit: 100, // 100 requêtes max par `ttl`
      },
    ]),

    // --- Modules de l'application ---

    /**
     * `PrismaModule`: Encapsule la logique de connexion et d'accès à la base de données
     * via l'ORM Prisma.
     */
    PrismaModule,

    /**
     * `AuthModule`: Gère toutes les fonctionnalités liées à l'authentification
     * (inscription, connexion, gestion des tokens JWT).
     */
    AuthModule,

    /**
     * `UsersModule`: Gère les fonctionnalités liées aux utilisateurs (profil, etc.).
     */
    UsersModule,
  ],

  /**
   * `controllers`: Liste des contrôleurs gérés par ce module.
   * `AppController` est souvent utilisé pour des routes de base (ex: health check).
   */
  controllers: [AppController],

  /**
   * `providers`: Services et autres injectables.
   */
  providers: [
    AppService,
    /**
     * Enregistre le `ThrottlerGuard` comme un garde global (`APP_GUARD`).
     * Cela applique automatiquement la protection de rate limiting à TOUS les endpoints
     * de l'application, conformément à la configuration du `ThrottlerModule`.
     */
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
