import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.type';

/**
 * Request interface with authenticated user
 */
interface RequestWithUser {
  user: JwtPayload;
}

/**
 * Custom decorator to extract the authenticated user from the request.
 * Returns the JwtPayload user object attached by the JWT strategy.
 * @returns JwtPayload object with user information
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
