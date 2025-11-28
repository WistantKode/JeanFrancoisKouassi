import { UserRole } from '@prisma/client';
import { Permission } from '../enums/permission.enum';
import {
  hasPermission,
  getRolePermissions,
} from '../constants/permissions.constants';

describe('Permissions Constants', () => {
  describe('MEMBER permissions', () => {
    it('should have read access only', () => {
      const perms = getRolePermissions(UserRole.MEMBER);
      expect(perms).toContain(Permission.BLOG_READ_PUBLISHED);
      expect(perms).toContain(Permission.EVENT_READ_PUBLISHED);
      expect(perms).not.toContain(Permission.BLOG_CREATE);
      expect(perms).not.toContain(Permission.EVENT_CREATE);
    });

    it('should not create blog or events', () => {
      expect(hasPermission(UserRole.MEMBER, Permission.BLOG_CREATE)).toBe(
        false,
      );
      expect(hasPermission(UserRole.MEMBER, Permission.EVENT_CREATE)).toBe(
        false,
      );
    });
  });

  describe('VERIFIED_MEMBER permissions', () => {
    it('should have authenticated voting and donations', () => {
      expect(
        hasPermission(UserRole.VERIFIED_MEMBER, Permission.VOTE_AUTHENTICATED),
      ).toBe(true);
      expect(
        hasPermission(UserRole.VERIFIED_MEMBER, Permission.DONATION_SUBMIT),
      ).toBe(true);
      expect(
        hasPermission(UserRole.VERIFIED_MEMBER, Permission.COMMENT_CREATE),
      ).toBe(true);
    });

    it('should not create blog or events', () => {
      expect(
        hasPermission(UserRole.VERIFIED_MEMBER, Permission.BLOG_CREATE),
      ).toBe(false);
      expect(
        hasPermission(UserRole.VERIFIED_MEMBER, Permission.EVENT_CREATE),
      ).toBe(false);
    });
  });

  describe('MODERATOR permissions', () => {
    it('should have moderation powers', () => {
      expect(hasPermission(UserRole.MODERATOR, Permission.USER_BAN)).toBe(true);
      expect(hasPermission(UserRole.MODERATOR, Permission.USER_SUSPEND)).toBe(
        true,
      );
      expect(
        hasPermission(UserRole.MODERATOR, Permission.WAITLIST_APPROVE),
      ).toBe(true);
    });

    it('should be able to publish events', () => {
      expect(hasPermission(UserRole.MODERATOR, Permission.EVENT_PUBLISH)).toBe(
        true,
      );
    });

    it('should view all analytics', () => {
      expect(
        hasPermission(UserRole.MODERATOR, Permission.ANALYTICS_VIEW_ALL),
      ).toBe(true);
      expect(
        hasPermission(UserRole.MODERATOR, Permission.VOTE_VIEW_RESULTS),
      ).toBe(true);
    });

    it('should NOT create blog posts', () => {
      expect(hasPermission(UserRole.MODERATOR, Permission.BLOG_CREATE)).toBe(
        false,
      );
    });
  });

  describe('BLOG_ADMIN permissions', () => {
    it('should have full blog control', () => {
      expect(hasPermission(UserRole.BLOG_ADMIN, Permission.BLOG_CREATE)).toBe(
        true,
      );
      expect(hasPermission(UserRole.BLOG_ADMIN, Permission.BLOG_PUBLISH)).toBe(
        true,
      );
      expect(
        hasPermission(UserRole.BLOG_ADMIN, Permission.BLOG_UPDATE_ANY),
      ).toBe(true);
      expect(hasPermission(UserRole.BLOG_ADMIN, Permission.BLOG_DELETE)).toBe(
        true,
      );
    });

    it('should view blog analytics', () => {
      expect(
        hasPermission(UserRole.BLOG_ADMIN, Permission.ANALYTICS_VIEW_BLOG),
      ).toBe(true);
    });

    it('should NOT manage events', () => {
      expect(hasPermission(UserRole.BLOG_ADMIN, Permission.EVENT_CREATE)).toBe(
        false,
      );
      expect(hasPermission(UserRole.BLOG_ADMIN, Permission.EVENT_PUBLISH)).toBe(
        false,
      );
      expect(hasPermission(UserRole.BLOG_ADMIN, Permission.EVENT_DELETE)).toBe(
        false,
      );
    });
  });

  describe('EVENT_ADMIN permissions', () => {
    it('should have full event control', () => {
      expect(hasPermission(UserRole.EVENT_ADMIN, Permission.EVENT_CREATE)).toBe(
        true,
      );
      expect(
        hasPermission(UserRole.EVENT_ADMIN, Permission.EVENT_PUBLISH),
      ).toBe(true);
      expect(
        hasPermission(UserRole.EVENT_ADMIN, Permission.EVENT_UPDATE_ANY),
      ).toBe(true);
      expect(hasPermission(UserRole.EVENT_ADMIN, Permission.EVENT_DELETE)).toBe(
        true,
      );
      expect(
        hasPermission(UserRole.EVENT_ADMIN, Permission.EVENT_CONFIGURE),
      ).toBe(true);
    });

    it('should view event analytics', () => {
      expect(
        hasPermission(UserRole.EVENT_ADMIN, Permission.ANALYTICS_VIEW_EVENTS),
      ).toBe(true);
    });

    it('should NOT manage blog', () => {
      expect(hasPermission(UserRole.EVENT_ADMIN, Permission.BLOG_CREATE)).toBe(
        false,
      );
      expect(hasPermission(UserRole.EVENT_ADMIN, Permission.BLOG_PUBLISH)).toBe(
        false,
      );
      expect(hasPermission(UserRole.EVENT_ADMIN, Permission.BLOG_DELETE)).toBe(
        false,
      );
    });
  });

  describe('SUPER_ADMIN permissions', () => {
    it('should have ALL permissions', () => {
      const allPermissions = Object.values(Permission);
      const superAdminPerms = getRolePermissions(UserRole.SUPER_ADMIN);

      expect(superAdminPerms.length).toBe(allPermissions.length);

      // Vérifier quelques permissions clés
      expect(hasPermission(UserRole.SUPER_ADMIN, Permission.BLOG_CREATE)).toBe(
        true,
      );
      expect(hasPermission(UserRole.SUPER_ADMIN, Permission.EVENT_CREATE)).toBe(
        true,
      );
      expect(
        hasPermission(UserRole.SUPER_ADMIN, Permission.USER_CHANGE_ROLE),
      ).toBe(true);
      expect(
        hasPermission(UserRole.SUPER_ADMIN, Permission.ANALYTICS_VIEW_ALL),
      ).toBe(true);
    });
  });

  describe('Separation of concerns', () => {
    it('BLOG_ADMIN and EVENT_ADMIN should have distinct permissions', () => {
      const blogPerms = getRolePermissions(UserRole.BLOG_ADMIN);
      const eventPerms = getRolePermissions(UserRole.EVENT_ADMIN);

      // BLOG_ADMIN a blog mais pas events
      expect(blogPerms).toContain(Permission.BLOG_CREATE);
      expect(blogPerms).not.toContain(Permission.EVENT_CREATE);

      // EVENT_ADMIN a events mais pas blog
      expect(eventPerms).toContain(Permission.EVENT_CREATE);
      expect(eventPerms).not.toContain(Permission.BLOG_CREATE);
    });
  });
});
