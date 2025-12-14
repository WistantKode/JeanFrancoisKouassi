import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModerationLogDto {
  @ApiProperty({ example: 'USER_BAN' })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({ example: 'USER' })
  @IsString()
  @IsNotEmpty()
  targetType: string;

  @ApiProperty({ example: 'uuid-of-target' })
  @IsString()
  @IsNotEmpty()
  targetId: string;

  @ApiPropertyOptional({ example: 'Reason for action' })
  @IsString()
  @IsOptional()
  reason?: string;
}
