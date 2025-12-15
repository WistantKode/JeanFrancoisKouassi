/**
 * @file users.module.ts
 * @description Module dédié à la gestion des utilisateurs.
 * Ce module regroupe les composants nécessaires pour interagir avec les données
 * des utilisateurs, comme la récupération et la mise à jour de leur profil.
 */

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  /**
   * `providers`: Le `UsersService` contient la logique métier pour les utilisateurs.
   */
  providers: [UsersService],
  /**
   * `controllers`: Le `UsersController` expose les endpoints relatifs aux utilisateurs
   * (ex: `/users/me`).
   */
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
