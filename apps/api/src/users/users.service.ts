/**
 * @file users.service.ts
 * @description Service contenant la logique métier pour la gestion des utilisateurs.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity, PublicUserDto } from './entities/user.entity';
import { UpdateProfileDto } from './dto';
import { UserRole } from '@prisma/client';

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
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateProfileDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        city: true,
        region: true,
        country: true,
        status: true,
        emailVerified: true,
        emailVerifiedAt: true,
        updated: true,
        lastLoginAt: true,
      },
    });
  }

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateRole(id: string, role: UserRole) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
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
      password,
      passwordResetToken,
      verificationToken,
      lastLoginIp,
      passwordResetExpires,
      ...result
    } = user;
    void password;
    void passwordResetToken;
    void verificationToken;
    void lastLoginIp;
    void passwordResetExpires;
    return result;
  }
}
