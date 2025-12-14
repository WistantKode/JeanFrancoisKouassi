/**
 * @file prisma.module.ts
 * @description Module pour l'intégration de Prisma.
 * Ce module configure et exporte le `PrismaService`, le rendant disponible
 * pour l'injection de dépendances dans toute l'application.
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

/**
 * Le décorateur `@Global()` fait du `PrismaService` un service global.
 * Cela signifie que vous n'avez pas besoin d'importer `PrismaModule` dans chaque
 * module de fonctionnalité qui a besoin d'accéder à la base de données.
 * C'est une pratique courante pour les services de base de données.
 */
@Global()
@Module({
  imports: [ConfigModule], // Importé si le service en a besoin (ex: pour l'URL de la DB).
  /**
   * `providers`: Déclare le `PrismaService` comme un injectable géré par ce module.
   */
  providers: [PrismaService],
  /**
   * `exports`: Rend le `PrismaService` disponible pour les autres modules de l'application.
   */
  exports: [PrismaService],
})
export class PrismaModule {}
