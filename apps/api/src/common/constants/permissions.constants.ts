import { UserRole } from '@prisma/client';
import { Permission } from '../enums/permission.enum';

/**
 * Matrice des permissions par défaut pour chaque rôle
 * Ces permissions peuvent être étendues en Phase 3 via UserPermissions table
 *
 * Hiérarchie:
 * MEMBER → VERIFIED_MEMBER → MODERATOR/EVENT_ADMIN/BLOG_ADMIN → SUPER_ADMIN
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // MEMBER (Sympathisant de base
  [UserRole.MEMBER]: [
    // Lecture publique
    Permission.BLOG_READ_PUBLISHED,
    Permission.EVENT_READ_PUBLISHED,

    // Gestion propre profil
    Permission.USER_READ_OWN,
    Permission.USER_UPDATE_OWN,

    // Actions basiques
    Permission.VOTE_ANONYMOUS,
    Permission.WAITLIST_SUBMIT,
  ],

  //  VERIFIED_MEMBER (Militant Vérifié)
  [UserRole.VERIFIED_MEMBER]: [
    // Hérite de MEMBER
    Permission.BLOG_READ_PUBLISHED,
    Permission.EVENT_READ_PUBLISHED,
    Permission.USER_READ_OWN,
    Permission.USER_UPDATE_OWN,
    Permission.VOTE_ANONYMOUS,
    Permission.WAITLIST_SUBMIT,

    // Permissions supplémentaires
    Permission.VOTE_AUTHENTICATED,
    Permission.DONATION_SUBMIT,
    Permission.COMMENT_CREATE,
  ],

  //  MODERATOR (Coordinateur)
  [UserRole.MODERATOR]: [
    // Hérite de VERIFIED_MEMBER
    Permission.BLOG_READ_PUBLISHED,
    Permission.EVENT_READ_PUBLISHED,
    Permission.USER_READ_OWN,
    Permission.USER_UPDATE_OWN,
    Permission.VOTE_ANONYMOUS,
    Permission.VOTE_AUTHENTICATED,
    Permission.DONATION_SUBMIT,
    Permission.COMMENT_CREATE,

    // Modération utilisateurs
    Permission.USER_LIST_ALL,
    Permission.USER_SUSPEND,
    Permission.USER_BAN,

    // Waitlist
    Permission.WAITLIST_READ_ALL,
    Permission.WAITLIST_APPROVE,

    // Événements (peut publier)
    Permission.EVENT_READ_ALL,
    Permission.EVENT_PUBLISH,

    // Modération
    Permission.COMMENT_MODERATE,
    Permission.MODERATION_VIEW_LOGS,
    Permission.MODERATION_CREATE_LOG,

    // Analytics (voit tout)
    Permission.ANALYTICS_VIEW_ALL,
    Permission.VOTE_VIEW_RESULTS,
    Permission.DONATION_VIEW_ALL,
  ],

  //  EVENT_ADMIN (Chef Terrain)
  [UserRole.EVENT_ADMIN]: [
    // Base VERIFIED_MEMBER
    Permission.BLOG_READ_PUBLISHED,
    Permission.EVENT_READ_PUBLISHED,
    Permission.USER_READ_OWN,
    Permission.USER_UPDATE_OWN,
    Permission.VOTE_AUTHENTICATED,
    Permission.DONATION_SUBMIT,
    Permission.COMMENT_CREATE,

    // Contrôle total événements
    Permission.EVENT_READ_ALL,
    Permission.EVENT_CREATE,
    Permission.EVENT_UPDATE_OWN,
    Permission.EVENT_UPDATE_ANY,
    Permission.EVENT_PUBLISH,
    Permission.EVENT_DELETE,
    Permission.EVENT_CONFIGURE,

    // Analytics événements
    Permission.ANALYTICS_VIEW_EVENTS,
    Permission.DONATION_VIEW_ALL,
  ],

  // BLOG_ADMIN (Chef Communication)
  [UserRole.BLOG_ADMIN]: [
    // Base VERIFIED_MEMBER
    Permission.BLOG_READ_PUBLISHED,
    Permission.EVENT_READ_PUBLISHED,
    Permission.USER_READ_OWN,
    Permission.USER_UPDATE_OWN,
    Permission.VOTE_AUTHENTICATED,
    Permission.DONATION_SUBMIT,
    Permission.COMMENT_CREATE,

    // Contrôle total blog
    Permission.BLOG_READ_DRAFT,
    Permission.BLOG_CREATE,
    Permission.BLOG_UPDATE_OWN,
    Permission.BLOG_UPDATE_ANY,
    Permission.BLOG_PUBLISH,
    Permission.BLOG_DELETE,

    // Analytics blog
    Permission.ANALYTICS_VIEW_BLOG,
  ],

  //  SUPER_ADMIN
  [UserRole.SUPER_ADMIN]: [
    // TOUS les permissions
    ...Object.values(Permission),
  ],
};

/**
 * Vérifie si un rôle a une permission spécifique
 *
 * @param role - Rôle de l'utilisateur
 * @param permission - Permission à vérifier
 * @returns true si le rôle a la permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return DEFAULT_ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Récupère toutes les permissions d'un rôle
 *
 * @param role - Rôle de l'utilisateur
 * @returns Array de permissions
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return DEFAULT_ROLE_PERMISSIONS[role] ?? [];
}
