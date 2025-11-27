import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModerationLogDto } from './dto/create-moderation.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserStatus } from '@prisma/client';

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: PrismaService) {}

  async createLog(adminId: string, dto: CreateModerationLogDto) {
    return this.prisma.moderationLog.create({
      data: {
        adminId,
        ...dto,
      },
      include: {
        admin: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async banUser(adminId: string, dto: BanUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Transaction to update user status and create log
    return this.prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: dto.userId },
        data: { status: UserStatus.BANNED },
      });

      await tx.moderationLog.create({
        data: {
          adminId,
          action: 'USER_BAN',
          targetType: 'USER',
          targetId: dto.userId,
          reason: dto.reason,
        },
      });

      return updatedUser;
    });
  }

  async findAllLogs() {
    return this.prisma.moderationLog.findMany({
      include: {
        admin: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
