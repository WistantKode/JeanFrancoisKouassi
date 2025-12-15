import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Le token de réinitialisation reçu par email',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'NewSuperSecretPassword123!',
    description: 'Le nouveau mot de passe (min 8 caractères)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  newPassword: string;
}
