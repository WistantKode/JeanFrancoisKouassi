import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'jean.kouassi@example.com',
    description:
      "L'adresse email de l'utilisateur qui a oublié son mot de passe.",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
