# 🔐 Plan d'Implémentation RBAC + Security Monitoring

**Projet**: JFK Campaign Platform  
**Version**: 1.0  
**Date**: 27 Novembre 2025  
**Approche**: Hybride Progressive (4 Phases)

---

## 📋 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Phase 1: RBAC Core](#phase-1-rbac-core)
3. [Phase 2: Security Monitoring Basic](#phase-2-security-monitoring-basic)
4. [Phase 3: RBAC Advanced](#phase-3-rbac-advanced)
5. [Phase 4: Security Monitoring Advanced](#phase-4-security-monitoring-advanced)
6. [Timeline et Estimation](#timeline-et-estimation)
7. [Checklist de Validation](#checklist-de-validation)

---

## 📊 Vue d'Ensemble

### Objectif

Implémenter un système complet de gestion des permissions (RBAC) avec surveillance de sécurité (Security Monitoring) de manière progressive et sécurisée.

### Stratégie

```
Phase 1 (10-12h) → App Production-Ready avec RBAC de base
Phase 2 (8-10h)  → + Surveillance basique
Phase 3 (8-10h)  → + Permissions dynamiques
Phase 4 (20-25h) → + Surveillance ultra-stricte

Total: 50-60h
```

### Livraison de Valeur

| Après Phase | Status | Peut Déployer? |
|-------------|--------|----------------|
| Phase 1 | RBAC fonctionnel, modules sécurisés | ✅ OUI |
| Phase 2 | + Logs et protection brute-force | ✅ OUI |
| Phase 3 | + Flexibilité permissions | ✅ OUI |
| Phase 4 | + Sécurité maximale | ✅ OUI |

---

## 🔵 Phase 1: RBAC Core

**Durée**: 10-12h  
**Priorité**: 🔴 CRITIQUE  
**Status**: Production-Ready après cette phase

### Objectifs Phase 1

- ✅ Définir matrice complète des permissions
- ✅ Implémenter guards de permissions
- ✅ Sécuriser modules Articles, Events, Moderation, Users
- ✅ Tests E2E par rôle

---

### Commit 1: Permissions Foundation

**Branch**: `feature/rbac-01-permissions-foundation`

#### Fichiers à créer

```
apps/api/src/common/
├── enums/
│   └── permission.enum.ts
└── constants/
    └── permissions.constants.ts
```

#### 1.1 Permission Enum

**Fichier**: `src/common/enums/permission.enum.ts`

```typescript
/**
 * Enum complet de toutes les permissions du système
 * Format: RESOURCE:ACTION ou RESOURCE:ACTION:SCOPE
 */
export enum Permission {
  // ============== BLOG ==============
  BLOG_READ_PUBLISHED = 'blog:read:published',
  BLOG_READ_DRAFT = 'blog:read:draft',
  BLOG_CREATE = 'blog:create',
  BLOG_UPDATE_OWN = 'blog:update:own',
  BLOG_UPDATE_ANY = 'blog:update:any',
  BLOG_PUBLISH = 'blog:publish',
  BLOG_DELETE = 'blog:delete',

  // ============== EVENTS ==============
  EVENT_READ_PUBLISHED = 'event:read:published',
  EVENT_READ_ALL = 'event:read:all',
  EVENT_CREATE = 'event:create',
  EVENT_UPDATE_OWN = 'event:update:own',
  EVENT_UPDATE_ANY = 'event:update:any',
  EVENT_PUBLISH = 'event:publish',
  EVENT_DELETE = 'event:delete',
  EVENT_CONFIGURE = 'event:configure', // Tickets, donations, etc.

  // ============== USERS ==============
  USER_READ_OWN = 'user:read:own',
  USER_UPDATE_OWN = 'user:update:own',
  USER_LIST_ALL = 'user:list:all',
  USER_SUSPEND = 'user:suspend',
  USER_BAN = 'user:ban',
  USER_CHANGE_ROLE = 'user:change:role',

  // ============== WAITLIST ==============
  WAITLIST_SUBMIT = 'waitlist:submit',
  WAITLIST_READ_ALL = 'waitlist:read:all',
  WAITLIST_APPROVE = 'waitlist:approve',

  // ============== VOTES & DONATIONS ==============
  VOTE_ANONYMOUS = 'vote:anonymous',
  VOTE_AUTHENTICATED = 'vote:authenticated',
  VOTE_VIEW_RESULTS = 'vote:view:results',
  DONATION_SUBMIT = 'donation:submit',
  DONATION_VIEW_ALL = 'donation:view:all',

  // ============== MODERATION ==============
  MODERATION_VIEW_LOGS = 'moderation:view:logs',
  MODERATION_CREATE_LOG = 'moderation:create:log',

  // ============== COMMENTS ==============
  COMMENT_CREATE = 'comment:create',
  COMMENT_MODERATE = 'comment:moderate',

  // ============== ANALYTICS ==============
  ANALYTICS_VIEW_BLOG = 'analytics:view:blog',
  ANALYTICS_VIEW_EVENTS = 'analytics:view:events',
  ANALYTICS_VIEW_ALL = 'analytics:view:all',
  ANALYTICS_EXPORT = 'analytics:export',
}
```

#### 1.2 Permissions Constants

**Fichier**: `src/common/constants/permissions.constants.ts`

```typescript
import { UserRole } from '@prisma/client';
import { Permission } from '../enums/permission.enum';

/**
 * Matrice des permissions par défaut pour chaque rôle
 * SUPER_ADMIN peut étendre ces permissions (Phase 3)
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // ========== MEMBER (Sympathisant) ==========
  [UserRole.MEMBER]: [
    Permission.BLOG_READ_PUBLISHED,
    Permission.EVENT_READ_PUBLISHED,
    Permission.USER_READ_OWN,
    Permission.USER_UPDATE_OWN,
    Permission.VOTE_ANONYMOUS,
    Permission.WAITLIST_SUBMIT,
  ],

  // ========== VERIFIED_MEMBER (Militant Vérifié) ==========
  [UserRole.VERIFIED_MEMBER]: [
    // Hérite de MEMBER
    ...DEFAULT_ROLE_PERMISSIONS[UserRole.MEMBER],
    
    // Permissions supplémentaires
    Permission.VOTE_AUTHENTICATED,
    Permission.DONATION_SUBMIT,
    Permission.COMMENT_CREATE,
  ],

  // ========== MODERATOR (Coordinateur) ==========
  [UserRole.MODERATOR]: [
    // Hérite de VERIFIED_MEMBER
    ...DEFAULT_ROLE_PERMISSIONS[UserRole.VERIFIED_MEMBER],
    
    // Modération utilisateurs
    Permission.USER_LIST_ALL,
    Permission.USER_SUSPEND,
    Permission.USER_BAN,
    
    // Waitlist
    Permission.WAITLIST_READ_ALL,
    Permission.WAITLIST_APPROVE,
    
    // Événements
    Permission.EVENT_READ_ALL,
    Permission.EVENT_PUBLISH, // Peut publier événements
    
    // Modération
    Permission.COMMENT_MODERATE,
    Permission.MODERATION_VIEW_LOGS,
    
    // Analytics
    Permission.ANALYTICS_VIEW_ALL, // Voit tous les analytics
    Permission.VOTE_VIEW_RESULTS,
  ],

  // ========== EVENT_ADMIN (Chef Terrain) ==========
  [UserRole.EVENT_ADMIN]: [
    // Hérite de VERIFIED_MEMBER
    ...DEFAULT_ROLE_PERMISSIONS[UserRole.VERIFIED_MEMBER],
    
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
  ],

  // ========== BLOG_ADMIN (Chef Communication) ==========
  [UserRole.BLOG_ADMIN]: [
    // Hérite de VERIFIED_MEMBER
    ...DEFAULT_ROLE_PERMISSIONS[UserRole.VERIFIED_MEMBER],
    
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

  // ========== SUPER_ADMIN (Direction Campagne) ==========
  [UserRole.SUPER_ADMIN]: [
    // TOUS les permissions
    ...Object.values(Permission),
  ],
};

/**
 * Helper function pour vérifier si un rôle a une permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return DEFAULT_ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Helper function pour obtenir toutes les permissions d'un rôle
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return DEFAULT_ROLE_PERMISSIONS[role] ?? [];
}
```

#### 1.3 Tests Unitaires

**Fichier**: `src/common/constants/permissions.constants.spec.ts`

```typescript
import { UserRole } from '@prisma/client';
import { Permission } from '../enums/permission.enum';
import { DEFAULT_ROLE_PERMISSIONS, hasPermission } from './permissions.constants';

describe('Permissions Constants', () => {
  describe('MEMBER permissions', () => {
    it('should have read access only', () => {
      const perms = DEFAULT_ROLE_PERMISSIONS[UserRole.MEMBER];
      expect(perms).toContain(Permission.BLOG_READ_PUBLISHED);
      expect(perms).not.toContain(Permission.BLOG_CREATE);
    });
  });

  describe('BLOG_ADMIN permissions', () => {
    it('should have blog management but not event management', () => {
      const perms = DEFAULT_ROLE_PERMISSIONS[UserRole.BLOG_ADMIN];
      expect(perms).toContain(Permission.BLOG_CREATE);
      expect(perms).toContain(Permission.BLOG_PUBLISH);
      expect(perms).not.toContain(Permission.EVENT_CREATE);
    });
  });

  describe('MODERATOR permissions', () => {
    it('should have moderation and event publish', () => {
      const perms = DEFAULT_ROLE_PERMISSIONS[UserRole.MODERATOR];
      expect(perms).toContain(Permission.USER_BAN);
      expect(perms).toContain(Permission.EVENT_PUBLISH);
      expect(perms).toContain(Permission.ANALYTICS_VIEW_ALL);
    });
  });

  describe('SUPER_ADMIN permissions', () => {
    it('should have ALL permissions', () => {
      const perms = DEFAULT_ROLE_PERMISSIONS[UserRole.SUPER_ADMIN];
      const allPermissions = Object.values(Permission);
      expect(perms.length).toBe(allPermissions.length);
    });
  });
});
```

#### Commit Message

```
feat(rbac): add permissions foundation with role matrix

- Created Permission enum with 40+ granular permissions
- Defined DEFAULT_ROLE_PERMISSIONS for all 6 roles
- MODERATOR can publish events and view all analytics
- BLOG_ADMIN manages blog only (no events)
- EVENT_ADMIN manages events only (no blog)
- Added helper functions hasPermission() and getRolePermissions()
- Comprehensive unit tests for permissions matrix

Impact:
- Foundation ready for permissions guards
- Clear separation of responsibilities between roles
- Easy to extend permissions in future
```

---

### Commit 2: Permissions Guard & Decorator

**Branch**: `feature/rbac-02-permissions-guard`

#### Fichiers à créer

```
apps/api/src/common/
├── decorators/
│   ├── require-permissions.decorator.ts
│   └── public.decorator.ts
└── guards/
    └── permissions.guard.ts
```

#### 2.1 Decorators

**Fichier**: `src/common/decorators/require-permissions.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/permission.enum';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator pour spécifier les permissions requises pour un endpoint
 * Usage: @RequirePermissions(Permission.BLOG_CREATE, Permission.BLOG_PUBLISH)
 */
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
```

**Fichier**: `src/common/decorators/public.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator pour marquer un endpoint comme public (pas d'auth requise)
 * Usage: @Public()
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

#### 2.2 Permissions Guard

**Fichier**: `src/common/guards/permissions.guard.ts`

```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../enums/permission.enum';
import { DEFAULT_ROLE_PERMISSIONS } from '../constants/permissions.constants';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtPayload } from '../../auth/types/jwt-payload.type';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

/**
 * Guard qui vérifie si l'utilisateur a les permissions requises
 * Phase 1: Vérifie seulement permissions du rôle (synchrone)
 * Phase 3: Vérifiera aussi permissions personnalisées en DB (async)
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

    if (!requiredPermissions || requiredPermissions.length === 0) {
      // Pas de permissions spécifiées = juste auth requise
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

    // User doit avoir AU MOINS UNE des permissions requises
    const hasRequiredPermission = requiredPermissions.some(permission =>
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
```

#### 2.3 Tests

**Fichier**: `src/common/guards/permissions.guard.spec.ts`

```typescript
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';
import { Permission } from '../enums/permission.enum';
import { UserRole } from '@prisma/client';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new PermissionsGuard(reflector);
  });

  it('should allow access if no permissions required', () => {
    const context = createMockContext({ role: UserRole.MEMBER }, []);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow BLOG_ADMIN to create blog', () => {
    const context = createMockContext(
      { role: UserRole.BLOG_ADMIN },
      [Permission.BLOG_CREATE],
    );
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny MEMBER from creating blog', () => {
    const context = createMockContext(
      { role: UserRole.MEMBER },
      [Permission.BLOG_CREATE],
    );
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should allow MODERATOR to publish events', () => {
    const context = createMockContext(
      { role: UserRole.MODERATOR },
      [Permission.EVENT_PUBLISH],
    );
    expect(guard.canActivate(context)).toBe(true);
  });
});
```

#### Commit Message

```
feat(rbac): implement permissions guard and decorators

- Created @RequirePermissions() decorator
- Created @Public() decorator for public routes
- Implemented PermissionsGuard checking user role permissions
- Guard verifies user has at least ONE of required permissions
- Throws ForbiddenException with clear error message
- Added comprehensive unit tests

Impact:
- Can now protect endpoints with permission checks
- Clear error messages for unauthorized access
- Foundation ready for protecting modules
```

---

### Commit 3: Articles Module Secured

**Branch**: `feature/rbac-03-articles-module`

#### Fichiers à créer

```
apps/api/src/articles/
├── articles.module.ts
├── articles.controller.ts
├── articles.service.ts
├── dto/
│   ├── create-article.dto.ts
│   └── update-article.dto.ts
└── __tests__/
    └── articles.e2e-spec.ts
```

*(Continue avec les détails complets de chaque fichier...)*

#### Commit Message

```
feat(articles): implement articles module with RBAC protection

- Created complete CRUD module for articles
- Only BLOG_ADMIN and SUPER_ADMIN can create/publish
- Public can read published articles
- Ownership check for draft access
- E2E tests for all roles

Impact:
- Blog management operational
- Secure content creation workflow
```

---

### ⏭️ Commits 4-6

*(Même structure détaillée pour Events Module, Moderation Module, Users Admin)*

---

## 🟢 Phase 2: Security Monitoring Basic

*(8-10h, détails complets...)*

## 🟣 Phase 3: RBAC Advanced

*(8-10h, détails complets...)*

## 🔴 Phase 4: Security Monitoring Advanced

*(20-25h, détails complets...)*

---

## 📅 Timeline et Estimation

### Planning Recommandé

**Semaine 1**: Phase 1 (RBAC Core)  
**Semaine 2**: Phase 2 (Security Basic)  
**Semaine 3**: Phase 3 (RBAC Advanced)  
**Semaines 4-5**: Phase 4 (Security Advanced)

### Checkpoints

- ✅ Après Phase 1: APP PRODUCTION-READY
- ✅ Après Phase 2: Déploiement recommandé
- ✅ Après Phase 3: Flexibilité maximale
- ✅ Après Phase 4: Sécurité ultra-stricte

---

## ✅ Checklist de Validation

### Phase 1 Complete?
- [ ] `pnpm build` passe sans erreur
- [ ] `pnpm lint` passe sans erreur
- [ ] Tests E2E passent pour tous les rôles
- [ ] Swagger docs générées
- [ ] Audit permissions matrix validé

### Phase 2 Complete?
- [ ] Logs dans DB fonctionnels
- [ ] Protection brute-force active
- [ ] Dashboard affiche logs

### Phase 3 Complete?
- [ ] SUPER_ADMIN peut accorder permissions
- [ ] Permissions custom respectées par guards

### Phase 4 Complete?
- [ ] Détection anomalies fonctionne
- [ ] Sanctions automatiques testées
- [ ] Background jobs opérationnels

---

**Status**: 📋 PLAN PRÊT - En attente validation pour démarrage implémentation
