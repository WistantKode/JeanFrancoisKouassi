/**
 * @file auth.service.ts
 * @description Service contenant la logique métier pour l'authentification.
 * Ce fichier gère la création de comptes, la vérification des identifiants,
 * la génération de tokens JWT et la sanitization des données utilisateur.
 */

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PublicUserDto, toPublicUserDto } from '../users/entities/user.entity';
import { UserRole } from '@prisma/client';
import { JwtPayload } from './types/jwt-payload.type';
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService, // Injection du ConfigService
  ) {}

  /**
   * Inscrit un nouvel utilisateur et envoie un email de vérification.
   */
  async register(
    dto: RegisterDto,
  ): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      this.logger.warn(
        `Tentative d'inscription avec un email existant: ${dto.email}`,
      );
      return {
        message:
          'Si un compte avec cet email n"existe pas, un email de vérification a été envoyé.',
      };
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // Le token expire dans 1 heure

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        status: 'PENDING',
        verificationToken: hashedToken,
        verificationTokenExpires: tokenExpiry,
      },
    });

    this.logger.log(`Nouvel utilisateur créé (en attente de vérification): ${user.id}`);

    try {
      await this.mailService.sendVerificationEmail(user, verificationToken);
    } catch (error) {
      this.logger.error(
        `Échec de l'envoi de l'email pour l'utilisateur ${user.id}`,
        error,
      );
    }

    return {
      message:
        'Si un compte avec cet email n"existe pas, un email de vérification a été envoyé.',
    };
  }

  /**
   * Vérifie le token d'email, active l'utilisateur et retourne les tokens de connexion.
   * @param token Le token de vérification reçu par email.
   * @returns L'utilisateur et les tokens JWT.
   */
  async verifyEmail(
    token: string,
  ): Promise<{ user: PublicUserDto; accessToken: string; refreshToken: string }> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.prisma.user.findUnique({
      where: { verificationToken: hashedToken },
    });

    if (!user) {
      throw new BadRequestException('Le lien de vérification est invalide.');
    }

    if (new Date() > user.verificationTokenExpires) {
      // TODO: Ajouter une logique pour renvoyer un email de vérification
      throw new BadRequestException('Le lien de vérification a expiré.');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
        status: 'ACTIVE',
        verificationToken: null, // Le token est utilisé, on le supprime
        verificationTokenExpires: null,
      },
    });

    this.logger.log(`Email vérifié et utilisateur activé: ${user.id}`);

    const tokens = await this.generateTokens(
      updatedUser.id,
      updatedUser.email,
      updatedUser.role,
    );

    return {
      user: toPublicUserDto(updatedUser),
      ...tokens,
    };
  }

  /**
   * Authentifie un utilisateur.
   */
  async login(
    dto: LoginDto,
  ): Promise<{ user: PublicUserDto; accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    if (user.status !== 'ACTIVE') {
      this.logger.warn(`Tentative de connexion d'un utilisateur non actif: ${user.id} (Statut: ${user.status})`);
      if (user.status === 'PENDING') {
        throw new UnauthorizedException('Veuillez vérifier votre email avant de vous connecter.');
      }
      throw new UnauthorizedException('Votre compte n"est pas actif.');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    this.logger.log(`Utilisateur connecté: ${user.id}`);
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: toPublicUserDto(user),
      ...tokens,
    };
  }

  /**
   * Génère une paire de tokens JWT (accès et rafraîchissement).
   * Les durées de vie sont récupérées depuis la configuration.
   */
  private async generateTokens(userId: string, email: string, role: UserRole) {
    const payload: JwtPayload = { sub: userId, email, role };

    const accessTokenExpiresIn = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_EXPIRES_IN',
    );
    const refreshTokenExpiresIn = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_EXPIRES_IN',
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: accessTokenExpiresIn }),
      this.jwtService.signAsync(payload, { expiresIn: refreshTokenExpiresIn }),
    ]);

    return { accessToken, refreshToken };
  }
}
