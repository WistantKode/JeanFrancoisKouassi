import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
  Min,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Grand Meeting Abidjan' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'grand-meeting-abidjan' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Description of the event...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2025-12-25T18:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiPropertyOptional({ example: '2025-12-25T22:00:00Z' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ example: 'Palais de la Culture' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({ example: 5000 })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
