import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UserEntity, PublicUserDto } from '../users/entities/user.entity';
import { UserRole } from '@prisma/client';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user.
   * Checks for existing email, hashes password, creates user, and returns tokens.
   * @param dto RegisterDto containing user details
   * @returns User object (sanitized) and JWT tokens
   * @throws ConflictException if email already exists
   */
  async register(dto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.client.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await this.prisma.client.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        city: dto.city,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Authenticate a user.
   * Verifies email and password, updates last login, and returns tokens.
   * @param dto LoginDto containing email and password
   * @returns User object (sanitized) and JWT tokens
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(dto: LoginDto) {
    // Find user
    const user = await this.prisma.client.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.client.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Generate JWT access and refresh tokens.
   * @param userId User ID
   * @param email User Email
   * @param role User Role
   * @returns Object containing accessToken and refreshToken
   */
  private async generateTokens(userId: string, email: string, role: UserRole) {
    const payload: JwtPayload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Remove sensitive data from user object.
   * @param user Raw user object
   * @returns Sanitized user object without passwords or tokens
   */
  private sanitizeUser(user: UserEntity): PublicUserDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      password,
      passwordResetToken,
      verificationToken,
      lastLoginIp,
      passwordResetExpires,
      ...sanitized
    } = user;
    return sanitized;
  }
}
