import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../enums/permission.enum';
import { DEFAULT_ROLE_PERMISSIONS } from '../constants/permissions.constants';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import type { JwtPayload } from '../../auth/types/jwt-payload.type';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

/**
 * Guard qui vérifie si l'utilisateur a les permissions requises
 *
 * Phase 1: Vérifie seulement les permissions du rôle (synchrone)
 * Phase 3: Vérifiera aussi les permissions personnalisées en DB (async)
 *
 * Logique:
 * 1. Si route marquée @Public() → autorisé
 * 2. Si pas de permissions requises → juste auth nécessaire
 * 3. Si permissions requises → vérifie que user a AU MOINS UNE
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Check si route publique
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // 2. Récupérer permissions requises
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Pas de permissions spécifiées = juste auth requise (géré par JwtAuthGuard)
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // 3. Récupérer user depuis request
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    // 4. Vérifier permissions du rôle
    const userPermissions = DEFAULT_ROLE_PERMISSIONS[user.role];

    if (!userPermissions) {
      throw new ForbiddenException(`Invalid role: ${user.role}`);
    }

    // User doit avoir AU MOINS UNE des permissions requises (OR logic)
    const hasRequiredPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasRequiredPermission) {
      throw new ForbiddenException(
        `Insufficient permissions. Required: ${requiredPermissions.join(' OR ')}`,
      );
    }

    return true;
  }
}
