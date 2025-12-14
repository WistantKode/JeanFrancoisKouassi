import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { BanUserDto } from './dto/ban-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';
import { Permission } from '../common/enums/permission.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/types/jwt-payload.type';

@ApiTags('Moderation')
@Controller('moderation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('ban')
  @RequirePermissions(Permission.USER_BAN)
  banUser(@Body() banUserDto: BanUserDto, @CurrentUser() user: JwtPayload) {
    return this.moderationService.banUser(user.sub, banUserDto);
  }

  @Get('logs')
  @RequirePermissions(Permission.MODERATION_VIEW_LOGS)
  findAllLogs() {
    return this.moderationService.findAllLogs();
  }
}
