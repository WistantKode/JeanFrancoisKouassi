import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a user by their ID.
   * @param id User ID
   * @returns Sanitized user object
   * @throws NotFoundException if user not found
   */
  async findById(id: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Update a user's profile.
   * @param id User ID
   * @param data Update data
   * @returns Updated sanitized user object
   */
  async updateProfile(id: string, data: any) {
    const user = await this.prisma.client.user.update({
      where: { id },
      data,
    });

    return this.sanitizeUser(user);
  }

  /**
   * Remove sensitive data from user object.
   * @param user Raw user object
   * @returns Sanitized user object
   */
  private sanitizeUser(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, passwordResetToken, verificationToken, ...sanitized } =
      user;
    return sanitized;
  }
}
