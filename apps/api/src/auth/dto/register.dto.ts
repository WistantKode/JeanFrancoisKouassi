/**
 * @file register.dto.ts
 * @description Data Transfer Object pour l'inscription d'un utilisateur.
 * Les DTOs sont des objets qui définissent la forme des données envoyées sur le réseau.
 * Ils sont utilisés par `class-validator` pour la validation automatique et par
 * `@nestjs/swagger` pour la documentation de l'API.
 */

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  /**
   * L'email de l'utilisateur. Doit être une adresse email valide et unique.
   * `@ApiProperty` fournit un exemple pour la documentation Swagger.
   * `@IsEmail` et `@IsNotEmpty` sont des décorateurs de validation.
   */
  @ApiProperty({
    example: 'jean@example.com',
    description: "L'email de l'utilisateur",
  })
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  @IsNotEmpty({ message: "L'email ne peut pas être vide." })
  email: string;

  /**
   * Le mot de passe de l'utilisateur.
   * Une politique de mot de passe robuste est appliquée via les décorateurs.
   */
  @ApiProperty({
    example: 'SecureP@ss123',
    description: 'Le mot de passe (doit être complexe)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Le mot de passe doit faire au moins 8 caractères.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.',
  })
  password: string;

  /**
   * Le prénom de l'utilisateur.
   */
  @ApiProperty({ example: 'Jean', description: "Le prénom de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * Le nom de famille de l'utilisateur.
   */
  @ApiProperty({
    example: 'Kouassi',
    description: 'Le nom de famille de l"utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * Le numéro de téléphone (optionnel).
   */
  @ApiProperty({
    example: '+225 0712345678',
    required: false,
    description: 'Le numéro de téléphone (optionnel)',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  /**
   * La ville de résidence (optionnel).
   */
  @ApiProperty({
    example: 'Abidjan',
    required: false,
    description: 'La ville de résidence (optionnel)',
  })
  @IsString()
  @IsOptional()
  city?: string;
}
