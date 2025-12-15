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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto, RefreshDto } from './dto';

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
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
    * Récupère le profil de l'utilisateur connecté.
    * @route GET /auth/me
    * @returns L'objet utilisateur public.
    */
   @Get('me')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({ summary: 'Récupérer le profil utilisateur connecté' })
   @ApiResponse({ status: 200, description: 'Profil récupéré avec succès.' })
   async getProfile(@Req() req: Request & { user: any }) {
     return this.usersService.findById(req.user.sub);
   }

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
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      undefined;
    const userAgent = req.headers['user-agent'] || undefined;

    return this.authService.loginWithMetadata(dto, ipAddress, userAgent);
  }

  /**
   * Endpoint pour rafraîchir les tokens d'accès.
   * Implémente la rotation : l'ancien refresh token est révoqué et un nouveau est généré.
   * @route POST /auth/refresh
   * @param dto - Le DTO contenant le refresh token.
   * @param req - La requête HTTP pour extraire l'IP et le user agent.
   * @returns Nouveaux tokens d'accès et de rafraîchissement.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rafraîchir les tokens d\'accès' })
  @ApiResponse({
    status: 200,
    description: 'Tokens rafraîchis avec succès. L\'ancien refresh token est révoqué.',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token invalide, expiré ou révoqué.',
  })
  async refresh(@Body() dto: RefreshDto, @Req() req: Request) {
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      undefined;
    const userAgent = req.headers['user-agent'] || undefined;

    return this.authService.refresh(dto.refreshToken, ipAddress, userAgent);
  }
  /**
   * Endpoint pour se déconnecter.
   * Révoque le refresh token fourni.
   * @route POST /auth/logout
   * @param dto - Le refresh token à révoquer
   * @param req - La requête (pour récupérer l'ID user si connecté, sinon on se base sur le token)
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Déconnecter un utilisateur' })
  @ApiResponse({ status: 200, description: 'Déconnexion réussie.' })
  async logout(@Body() dto: RefreshDto, @Req() req: Request & { user: any }) {
    // req.user est peuplé par JwtAuthGuard (JwtStrategy)
    return this.authService.logout(req.user.sub, dto.refreshToken);
  }
}
