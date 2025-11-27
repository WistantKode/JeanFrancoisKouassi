import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity, PublicUserDto } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a user by their ID.
   * @param id User ID
   * @returns Sanitized user object
   * @throws NotFoundException if user not found
   */
  async findById(id: string): Promise<PublicUserDto> {
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
  async updateProfile(
    id: string,
    data: UpdateProfileDto,
  ): Promise<PublicUserDto> {
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
  private sanitizeUser(user: UserEntity): PublicUserDto {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      password,
      passwordResetToken,
      verificationToken,
      lastLoginIp,
      passwordResetExpires,
      ...sanitized
    } = user;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return sanitized;
  }
}
