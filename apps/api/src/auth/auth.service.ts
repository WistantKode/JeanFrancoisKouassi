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
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PublicUserDto, toPublicUserDto } from '../users/entities/user.entity';
import { UserRole } from '@prisma/client';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Inscrit un nouvel utilisateur.
   * 1. Vérifie si l'email existe déjà.
   * 2. Hash le mot de passe.
   * 3. Crée l'utilisateur en base de données.
   * 4. Génère les tokens d'accès et de rafraîchissement.
   * @param dto - Données d'inscription validées.
   * @returns Un objet contenant l'utilisateur "nettoyé" et les tokens.
   * @throws {ConflictException} Si l'email est déjà utilisé.
   */
  async register(dto: RegisterDto): Promise<{ user: PublicUserDto; accessToken: string; refreshToken: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      this.logger.warn(`Tentative d'inscription avec un email existant: ${dto.email}`);
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    this.logger.log(`Nouvel utilisateur inscrit: ${user.id}`);
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: toPublicUserDto(user),
      ...tokens,
    };
  }

  /**
   * Authentifie un utilisateur.
   * 1. Trouve l'utilisateur par email.
   * 2. Compare le mot de passe fourni avec le hash stocké.
   * 3. Met à jour la date de dernière connexion.
   * 4. Génère de nouveaux tokens.
   * @param dto - Données de connexion (email, mot de passe).
   * @returns Un objet contenant l'utilisateur "nettoyé" et les tokens.
   * @throws {UnauthorizedException} Si les identifiants sont invalides.
   */
  async login(dto: LoginDto): Promise<{ user: PublicUserDto; accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      this.logger.warn(`Tentative de connexion avec un email inexistant: ${dto.email}`);
      throw new UnauthorizedException('Identifiants invalides');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      this.logger.warn(`Échec de la connexion pour l'utilisateur: ${user.id}`);
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
   * @param userId - ID de l'utilisateur.
   * @param email - Email de l'utilisateur.
   * @param role - Rôle de l'utilisateur.
   * @returns Un objet contenant `accessToken` and `refreshToken`.
   */
  private async generateTokens(userId: string, email: string, role: UserRole) {
    const payload: JwtPayload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '7d' }), // Token d'accès
      this.jwtService.signAsync(payload, { expiresIn: '30d' }), // Token de rafraîchissement
    ]);

    return { accessToken, refreshToken };
  }
}
