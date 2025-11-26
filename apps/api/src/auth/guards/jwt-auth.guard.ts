import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that validates JWT tokens using the JwtStrategy.
 * Extends NestJS AuthGuard('jwt').
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
