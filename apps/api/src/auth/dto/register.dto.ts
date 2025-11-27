import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for user registration.
 */
export class RegisterDto {
  @ApiProperty({ example: 'jean@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
  })
  password: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Kouassi' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '+225 07 12 34 56 78', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Abidjan', required: false })
  @IsString()
  @IsOptional()
  city?: string;
}
