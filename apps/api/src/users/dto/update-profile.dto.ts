/**
 * @file update-profile.dto.ts
 * @description DTO pour la mise à jour du profil utilisateur.
 * Tous les champs sont optionnels, permettant à l'utilisateur de ne mettre à jour
 * que les informations qu'il souhaite.
 */

import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Jean', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Kouassi', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+225 0712345678', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Abidjan', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  /**
   * Le genre de l'utilisateur.
   * L'utilisation de l'enum `Gender` de Prisma garantit que seules les valeurs
   * définies dans le schéma de la base de données sont acceptées.
   */
  @ApiProperty({ enum: Gender, required: false })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Date de naissance au format ISO 8601',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({ example: 'Lagunes', required: false })
  @IsString()
  @IsOptional()
  region?: string;
}
