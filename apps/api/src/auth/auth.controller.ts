/**
 * @file auth.controller.ts
 * @description Contrôleur pour les endpoints d'authentification.
 * Ce fichier définit les routes HTTP publiques (`/auth/register`, `/auth/login`)
 * et délègue la logique métier au `AuthService`. Il est la porte d'entrée
 * pour tout ce qui concerne l'authentification.
 */

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

/**
 * Le décorateur `@ApiTags` regroupe les endpoints de ce contrôleur sous
 * l'étiquette "Authentication" dans la documentation Swagger.
 * `@Controller('auth')` préfixe toutes les routes de ce contrôleur par `/auth`.
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  /**
   * Le `AuthService` est injecté via l'injection de dépendances de NestJS.
   * C'est une bonne pratique pour séparer la couche "route" de la couche "métier".
   */
  constructor(private authService: AuthService) {}

  /**
   * Endpoint pour l'inscription d'un nouvel utilisateur.
   * @route POST /auth/register
   * @param dto - Le Data Transfer Object (DTO) contenant les informations d'inscription.
   *              Le `@Body()` décorateur, couplé au `ValidationPipe` global, assure que
   *              les données sont valides avant même que cette méthode ne soit exécutée.
   * @returns Un message indiquant que le processus d'inscription a commencé.
   */
  @Post('register')
  @ApiOperation({ summary: 'Inscrire un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description:
      'Processus d"inscription commencé. Un email de vérification a été envoyé.',
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * Endpoint pour vérifier l'email d'un utilisateur.
   * @route GET /auth/verify-email
   * @param token - Le token reçu dans le lien de l'email.
   * @returns L'utilisateur et les tokens JWT une fois l'email vérifié.
   */
  @Get('verify-email')
  @ApiOperation({ summary: 'Vérifier l"adresse email d"un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Email vérifié avec succès. L"utilisateur est maintenant connecté.',
  })
  @ApiResponse({
    status: 400,
    description: 'Le lien de vérification est invalide ou a expiré.',
  })
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  /**
   * Endpoint pour la connexion d'un utilisateur.
   * @route POST /auth/login
   * @param dto - Le DTO contenant l'email et le mot de passe.
   * @returns Un objet contenant l'utilisateur authentifié et les tokens JWT.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK) // Par défaut, POST renvoie 201, ici on veut 200 OK.
  @ApiOperation({ summary: 'Connecter un utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie.' })
  @ApiResponse({
    status: 401,
    description: 'Identifiants invalides ou compte non activé.',
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
