import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendVerificationDto {
  @ApiProperty({
    example: 'jean.kouassi@example.com',
    description: "L'adresse email de l'utilisateur.",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
