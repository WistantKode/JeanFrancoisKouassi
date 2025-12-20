/**
 * @file refresh.dto.ts
 * @description Data Transfer Object pour le rafraîchissement de tokens.
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  /**
   * Le refresh token à utiliser pour obtenir de nouveaux tokens.
   */
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Le refresh token',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le refresh token est requis.' })
  refreshToken: string;
}
