import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

/**
 * Decorator to set required roles for a route or controller.
 * @param roles List of roles required to access the resource
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
