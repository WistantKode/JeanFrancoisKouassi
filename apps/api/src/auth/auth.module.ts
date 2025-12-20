/**
 * @file auth.module.ts
 * @description Module dédié à l'authentification.
 * Ce module configure la gestion des JSON Web Tokens (JWT) et regroupe le contrôleur,
 * le service et les stratégies nécessaires à l'authentification des utilisateurs.
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    /**
     * `JwtModule`: Fournit et configure le service `JwtService` pour créer et
     * valider des tokens.
     * `registerAsync` est utilisé pour injecter le `ConfigService` et récupérer
     * le secret JWT et sa durée de validité depuis les variables d'environnement.
     * C'est une bonne pratique pour éviter de coder en dur des informations sensibles.
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        // Utilise la durée d'expiration de l'access token pour la signature par défaut
        signOptions: {
          expiresIn: configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRES_IN',
          ),
        },
      }),
    }),
    ConfigModule,
    MailModule,
    UsersModule,
  ],
  /**
   * `controllers`: Le `AuthController` expose les endpoints publics pour
   * l'inscription (`/register`) et la connexion (`/login`).
   */
  controllers: [AuthController],
  /**
   * `providers`:
   * - `AuthService`: Contient la logique métier (création d'utilisateur, validation de mot de passe).
   * - `JwtStrategy`: Définit la logique pour valider les tokens JWT sur les routes protégées.
   *   Elle est automatiquement utilisée par le module Passport.
   */
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
