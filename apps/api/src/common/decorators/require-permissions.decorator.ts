import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/permission.enum';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator pour spécifier les permissions requises pour un endpoint
 * 
 * L'utilisateur doit avoir AU MOINS UNE des permissions listées
 * 
 * @param permissions - Liste des permissions requises (OR logic)
 * 
 * @example
 * ```typescript
 * @RequirePermissions(Permission.BLOG_CREATE)
 * async createArticle() { ... }
 * 
 * // Multiple permissions (OR)
 * @RequirePermissions(Permission.BLOG_CREATE, Permission.BLOG_PUBLISH)
 * async publishArticle() { ... }
 * ```
 */
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
