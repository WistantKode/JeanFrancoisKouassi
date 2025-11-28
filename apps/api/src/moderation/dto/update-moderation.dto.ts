import { PartialType } from '@nestjs/swagger';
import { CreateModerationLogDto } from './create-moderation.dto';

export class UpdateModerationDto extends PartialType(CreateModerationLogDto) {}
