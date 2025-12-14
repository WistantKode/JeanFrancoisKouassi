import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to set required roles for a route or controller.
 * @param roles List of roles required to access the resource
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
