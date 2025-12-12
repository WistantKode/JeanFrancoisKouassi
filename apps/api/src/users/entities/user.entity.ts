/**
 * @file user.entity.ts
 * @description Définit les types et DTOs relatifs à l'entité Utilisateur.
 * Ce fichier est crucial pour le typage fort à travers l'application.
 */

import {
  User as PrismaUser,
  UserRole,
  UserStatus,
  Gender,
} from '@prisma/client';
import { ApiProperty, OmitType } from '@nestjs/swagger';

/**
 * `UserEntity` est une classe qui implémente le type `User` généré par Prisma.
 * L'utilisation d'une classe (plutôt que d'une interface) permet d'utiliser les
 * décorateurs de `@nestjs/swagger` pour documenter automatiquement les propriétés
 * du modèle dans l'API.
 *
 * Cette entité représente le modèle de données COMPLET de l'utilisateur,
 * y compris les champs sensibles. Elle est principalement utilisée pour le typage
 * interne dans les services.
 */
export class UserEntity implements PrismaUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  // Note: Le mot de passe est inclus ici pour la conformité avec le type Prisma,
  // mais il ne sera jamais exposé grâce au `PublicUserDto`.
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false, nullable: true })
  phone: string | null;

  @ApiProperty({ enum: Gender, required: false, nullable: true })
  gender: Gender | null;

  @ApiProperty({ required: false, nullable: true })
  dateOfBirth: Date | null;

  @ApiProperty({ required: false, nullable: true })
  city: string | null;

  @ApiProperty({ required: false, nullable: true })
  region: string | null;

  @ApiProperty()
  country: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty({ required: false, nullable: true })
  emailVerifiedAt: Date | null;

  verificationToken: string | null;
  verificationTokenExpires: Date | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;

  @ApiProperty({ required: false, nullable: true })
  lastLoginAt: Date | null;

  lastLoginIp: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updated: Date;
}

/**
 * `PublicUserDto` est le Data Transfer Object qui représente un utilisateur PUBLIC.
 * Il est dérivé de `UserEntity` en omettant les champs sensibles.
 *
 * `OmitType` est un utilitaire de `@nestjs/swagger` qui crée un nouveau type
 * en retirant les propriétés spécifiées.
 *
 * C'est ce type qui doit TOUJOURS être utilisé comme type de retour pour les
 * endpoints qui renvoient des informations utilisateur.
 */
export class PublicUserDto extends OmitType(UserEntity, [
  'password',
  'verificationToken',
  'passwordResetToken',
  'passwordResetExpires',
  'lastLoginIp',
] as const) {}

/**
 * Fonction utilitaire centralisée pour "nettoyer" un objet utilisateur.
 * Prend une entité utilisateur complète et retourne un DTO public.
 * @param user - L'objet utilisateur complet.
 * @returns Un objet `PublicUserDto` sans les champs sensibles.
 */
export function toPublicUserDto(user: UserEntity): PublicUserDto {
  const {
    password,
    verificationToken,
    passwordResetToken,
    passwordResetExpires,
    lastLoginIp,
    ...publicUser
  } = user;
  return publicUser;
}
