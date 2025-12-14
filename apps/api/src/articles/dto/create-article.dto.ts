import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'My First Campaign Article' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'my-first-campaign-article' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: '# Hello World\nThis is the content...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: 'A brief summary...' })
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
