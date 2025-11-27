import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { PermissionsGuard } from '../permissions.guard';
import { Permission } from '../../enums/permission.enum';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PermissionsGuard, Reflector],
    }).compile();

    guard = module.get<PermissionsGuard>(PermissionsGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  describe('Public routes', () => {
    it('should allow access to public routes', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(true);

      const context = createMockContext(null, []);
      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('Routes without specific permissions', () => {
    it('should allow access if no permissions required', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'test@jfk.ci', role: UserRole.MEMBER },
        [],
      );

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('Permission checks', () => {
    it('should allow BLOG_ADMIN to create blog', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.BLOG_CREATE]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'blog@jfk.ci', role: UserRole.BLOG_ADMIN },
        [Permission.BLOG_CREATE],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should deny MEMBER from creating blog', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.BLOG_CREATE]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'member@jfk.ci', role: UserRole.MEMBER },
        [Permission.BLOG_CREATE],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should allow MODERATOR to ban users', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.USER_BAN]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'mod@jfk.ci', role: UserRole.MODERATOR },
        [Permission.USER_BAN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should deny BLOG_ADMIN from banning users', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.USER_BAN]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'blog@jfk.ci', role: UserRole.BLOG_ADMIN },
        [Permission.USER_BAN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should allow MODERATOR to publish events', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.EVENT_PUBLISH]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'mod@jfk.ci', role: UserRole.MODERATOR },
        [Permission.EVENT_PUBLISH],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should allow if user has ANY of the required permissions (OR logic)', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.BLOG_CREATE, Permission.EVENT_CREATE]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'admin@jfk.ci', role: UserRole.SUPER_ADMIN },
        [Permission.BLOG_CREATE, Permission.EVENT_CREATE],
      );

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should throw if user not authenticated', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.BLOG_CREATE]); // PERMISSIONS

      const context = createMockContext(null, [Permission.BLOG_CREATE]);

      try {
        guard.canActivate(context);
        fail('Should have thrown ForbiddenException');
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect((error as ForbiddenException).message).toContain(
          'Authentication required',
        );
      }
    });

    it('should include required permissions in error message', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC
        .mockReturnValueOnce([Permission.BLOG_CREATE]); // PERMISSIONS

      const context = createMockContext(
        { sub: '123', email: 'member@jfk.ci', role: UserRole.MEMBER },
        [Permission.BLOG_CREATE],
      );

      expect(() => guard.canActivate(context)).toThrow('Required: blog:create');
    });
  });
});

/**
 * Helper function to create mock ExecutionContext
 */
function createMockContext(
  user: { sub: string; email: string; role: UserRole } | null,
  requiredPermissions: Permission[],
): ExecutionContext {
  const mockRequest = {
    user,
  };

  const context = {
    switchToHttp: () => ({
      getRequest: () => mockRequest,
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as unknown as ExecutionContext;

  return context;
}
