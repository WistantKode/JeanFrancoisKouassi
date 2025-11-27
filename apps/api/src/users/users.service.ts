/**
 * @file users.service.ts
 * @description Service contenant la logique métier pour la gestion des utilisateurs.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity, PublicUserDto } from './entities/user.entity';
import { UpdateProfileDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Trouve un utilisateur par son ID.
   * @param id - L'ID de l'utilisateur à trouver.
   * @returns L'objet utilisateur public (sans les données sensibles).
   * @throws {NotFoundException} Si aucun utilisateur n'est trouvé avec cet ID.
   */
  async findById(id: string): Promise<PublicUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Met à jour le profil d'un utilisateur.
   * @param id - L'ID de l'utilisateur à mettre à jour.
   * @param data - Les données à mettre à jour, provenant du `UpdateProfileDto`.
   * @returns Le profil utilisateur mis à jour et "nettoyé".
   */
  async updateProfile(
    id: string,
    data: UpdateProfileDto,
  ): Promise<PublicUserDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.sanitizeUser(user);
  }

  /**
   * "Nettoie" l'objet utilisateur en retirant les champs sensibles.
   * Cette méthode est partagée par les autres méthodes du service pour garantir
   * qu'aucune donnée sensible ne soit jamais retournée.
   * @param user - L'objet utilisateur complet provenant de Prisma.
   * @returns Un objet utilisateur public.
   */
  private sanitizeUser(user: UserEntity): PublicUserDto {
    const {
      password: _password,
      passwordResetToken: _passwordResetToken,
      verificationToken: _verificationToken,
      lastLoginIp: _lastLoginIp,
      passwordResetExpires: _passwordResetExpires,
      ...safeUser
    } = user;
    return safeUser;
  }
}
