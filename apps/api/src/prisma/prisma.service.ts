/**
 * @file prisma.service.ts
 * @description Service central pour l'interaction avec la base de données via Prisma.
 * Ce service étend `PrismaClient` et gère le cycle de vie de la connexion
 * à la base de données.
 */

import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  /**
   * Le constructeur initialise le `PrismaClient` avec un adaptateur de pool de connexions.
   * Utiliser un pool (`pg.Pool`) est une bonne pratique en production pour gérer
   * efficacement les connexions à la base de données PostgreSQL.
   * @param configService - Injecté pour récupérer l'URL de la base de données.
   */
  constructor(configService: ConfigService) {
    const connectionString = configService.getOrThrow<string>('DATABASE_URL');
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  /**
   * Getter pour assurer la rétrocompatibilité avec un usage potentiel de `prisma.client`.
   * Permet d'accéder à l'instance de Prisma via `this.prismaService.client` ou directement
   * `this.prismaService` (ex: `this.prismaService.user.findUnique(...)`).
   */
  get client() {
    return this;
  }

  /**
   * `OnModuleInit` est un hook du cycle de vie de NestJS.
   * Cette méthode est appelée une fois que le module a été initialisé.
   * On s'assure ici que la connexion à la base de données est bien établie.
   */
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
      throw error;
    }
  }

  /**
   * Configure les "shutdown hooks" pour fermer proprement la connexion à la base de données
   * lorsque l'application NestJS s'arrête.
   * Cela prévient les fuites de connexion.
   * @param app - L'instance de l'application NestJS.
   */
  enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', () => {
      void app.close();
    });
  }
}
