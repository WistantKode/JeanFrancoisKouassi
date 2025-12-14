import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { JwtPayload } from '../types/jwt-payload.type';

/**
 * Request interface with authenticated user
 */
interface RequestWithUser {
  user: JwtPayload;
}

/**
 * Guard that checks if the user has the required roles.
 * Uses Reflector to get roles metadata from the handler or class.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return requiredRoles.some((role) => user.role === role);
  }
}
