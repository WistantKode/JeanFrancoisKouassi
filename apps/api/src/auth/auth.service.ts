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

    if (!user.verificationTokenExpires || new Date() > user.verificationTokenExpires) {
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
    // Note: Les métadonnées IP/userAgent seront passées depuis le controller
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: toPublicUserDto(user),
      ...tokens,
    };
  }

  /**
   * Surcharge de login avec métadonnées pour audit.
   * @param dto Les identifiants de connexion
   * @param ipAddress L'adresse IP (optionnel)
   * @param userAgent Le user agent (optionnel)
   */
  async loginWithMetadata(
    dto: LoginDto,
    ipAddress?: string,
    userAgent?: string,
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
    const tokens = await this.generateTokens(user.id, user.email, user.role, ipAddress, userAgent);

    return {
      user: toPublicUserDto(user),
      ...tokens,
    };
  }

  /**
   * Rafraîchit les tokens d'accès en utilisant un refresh token.
   * Implémente la rotation : l'ancien refresh token est révoqué et un nouveau est généré.
   * @param refreshToken Le refresh token à utiliser
   * @param ipAddress L'adresse IP de la requête (optionnel, pour audit)
   * @param userAgent Le user agent de la requête (optionnel, pour audit)
   * @returns Nouveaux tokens d'accès et de rafraîchissement
   */
  async refresh(
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Hasher le token pour la recherche en DB
    const hashedToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    // Récupérer le token depuis la DB
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    });

    // Vérifier que le token existe, n'est pas révoqué et n'est pas expiré
    if (!tokenRecord) {
      this.logger.warn('Tentative de refresh avec un token invalide');
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (tokenRecord.revoked) {
      this.logger.warn(
        `Tentative de refresh avec un token révoqué: ${tokenRecord.id}`,
      );
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    if (tokenRecord.expiresAt < new Date()) {
      this.logger.warn(
        `Tentative de refresh avec un token expiré: ${tokenRecord.id}`,
      );
      // Nettoyer le token expiré
      await this.prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });
      throw new UnauthorizedException('Refresh token has expired');
    }

    // Vérifier que l'utilisateur est toujours actif
    if (
      tokenRecord.user.status === 'BANNED' ||
      tokenRecord.user.status === 'SUSPENDED'
    ) {
      this.logger.warn(
        `Tentative de refresh par un utilisateur non actif: ${tokenRecord.userId}`,
      );
      // Révoquer tous les tokens de cet utilisateur
      await this.revokeAllRefreshTokens(tokenRecord.userId);
      throw new UnauthorizedException('Account is not active');
    }

    // ROTATION : Révoquer l'ancien token
    await this.prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: { revoked: true },
    });

    this.logger.log(
      `Refresh token roté pour l'utilisateur: ${tokenRecord.userId}`,
    );

    // Générer de nouveaux tokens
    const newTokens = await this.generateTokens(
      tokenRecord.userId,
      tokenRecord.user.email,
      tokenRecord.user.role,
      ipAddress,
      userAgent,
    );

    return newTokens;
  }

  /**
   * Révoque tous les refresh tokens d'un utilisateur.
   * Utile lors du logout ou d'un changement de mot de passe.
   * @param userId L'ID de l'utilisateur
   */
  async revokeAllRefreshTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
    this.logger.log(`Tous les refresh tokens révoqués pour l'utilisateur: ${userId}`);
  }

  /**
   * Génère une paire de tokens JWT (accès et rafraîchissement) et stocke le refresh token en DB.
   * Les durées de vie sont récupérées depuis la configuration.
   * @param userId L'ID de l'utilisateur
   * @param email L'email de l'utilisateur
   * @param role Le rôle de l'utilisateur
   * @param ipAddress L'adresse IP (optionnel, pour audit)
   * @param userAgent Le user agent (optionnel, pour audit)
   * @returns Les tokens d'accès et de rafraîchissement
   */
  private async generateTokens(
    userId: string,
    email: string,
    role: UserRole,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const payload: JwtPayload = { sub: userId, email, role };

    const accessTokenExpiresIn = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_EXPIRES_IN',
    );
    const refreshTokenExpiresIn = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_EXPIRES_IN',
    );

    // Générer les tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: accessTokenExpiresIn }),
      this.jwtService.signAsync(payload, { expiresIn: refreshTokenExpiresIn }),
    ]);

    // Calculer la date d'expiration du refresh token
    const expiresAt = new Date();
    const refreshTokenExpiresInSeconds = this.parseExpiresIn(
      refreshTokenExpiresIn,
    );
    expiresAt.setSeconds(expiresAt.getSeconds() + refreshTokenExpiresInSeconds);

    // Hasher le refresh token avant de le stocker
    const hashedRefreshToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    // Stocker le refresh token en DB
    await this.prisma.refreshToken.create({
      data: {
        token: hashedRefreshToken,
        userId,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    this.logger.log(`Refresh token stocké pour l'utilisateur: ${userId}`);

    return { accessToken, refreshToken };
  }

  /**
   * Parse une chaîne d'expiration (ex: "7d", "30d", "3600s") en secondes.
   * @param expiresIn La chaîne d'expiration
   * @returns Le nombre de secondes
   */
  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      // Si le format n'est pas reconnu, essayer de parser comme nombre de secondes
      const seconds = parseInt(expiresIn, 10);
      if (isNaN(seconds)) {
        throw new Error(`Invalid expiresIn format: ${expiresIn}`);
      }
      return seconds;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      default:
        throw new Error(`Unknown time unit: ${unit}`);
    }
  }
}
