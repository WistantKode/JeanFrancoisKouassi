/**
 * @file users.controller.ts
 * @description Contrôleur pour la gestion des profils utilisateur.
 * Définit les routes protégées pour que les utilisateurs authentifiés puissent
 * accéder et modifier leurs propres informations.
 */

import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';
import { UpdateProfileDto } from './dto';
import { PublicUserDto } from './entities/user.entity';
import { JwtPayload } from 'src/auth/types';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard) // Applique la garde JWT à toutes les routes de ce contrôleur.
@ApiBearerAuth() // Indique dans Swagger que ces routes nécessitent un token Bearer.
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Récupère le profil de l'utilisateur actuellement authentifié.
   * @route GET /users/me
   * @param user - Le payload du JWT, injecté par le décorateur personnalisé `@CurrentUser`.
   *               Contient les informations de base de l'utilisateur (id, email, rôle).
   * @returns Le profil public de l'utilisateur.
   */
  @Get('me')
  @ApiOperation({ summary: 'Obtenir le profil de l"utilisateur actuel' })
  @ApiResponse({
    status: 200,
    description: 'Profil utilisateur récupéré avec succès.',
    type: PublicUserDto, // Indique le type de retour pour Swagger.
  })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  async getProfile(@CurrentUser() user: JwtPayload): Promise<PublicUserDto> {
    return this.usersService.findById(user.sub); // `sub` contient l'ID de l'utilisateur.
  }

  /**
   * Met à jour le profil de l'utilisateur actuellement authentifié.
   * @route PATCH /users/me
   * @param user - Le payload du JWT de l'utilisateur.
   * @param updateProfileDto - Les données à mettre à jour, validées par le `ValidationPipe`.
   * @returns Le profil utilisateur mis à jour.
   */
  @Patch('me')
  @ApiOperation({ summary: 'Mettre à jour le profil de l"utilisateur actuel' })
  @ApiResponse({
    status: 200,
    description: 'Profil mis à jour avec succès.',
    type: PublicUserDto,
  })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  async updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<PublicUserDto> {
    return this.usersService.updateProfile(user.sub, updateProfileDto);
  }
}
