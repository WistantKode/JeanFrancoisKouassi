import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(id: string, data: any) {
    const user = await this.prisma.client.user.update({
      where: { id },
      data,
    });

    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: any) {
    const { password, passwordResetToken, verificationToken, ...sanitized } =
      user;
    return sanitized;
  }
}
