/**
 * Enum complet de toutes les permissions du système JFK
 * Format: RESOURCE:ACTION ou RESOURCE:ACTION:SCOPE
 *
 * @example
 * Permission.BLOG_CREATE
 * Permission.EVENT_PUBLISH
 */
export enum Permission {
  // BLOG
  BLOG_READ_PUBLISHED = 'blog:read:published',
  BLOG_READ_DRAFT = 'blog:read:draft',
  BLOG_CREATE = 'blog:create',
  BLOG_UPDATE_OWN = 'blog:update:own',
  BLOG_UPDATE_ANY = 'blog:update:any',
  BLOG_PUBLISH = 'blog:publish',
  BLOG_DELETE = 'blog:delete',

  //  EVENTS
  EVENT_READ_PUBLISHED = 'event:read:published',
  EVENT_READ_ALL = 'event:read:all',
  EVENT_CREATE = 'event:create',
  EVENT_UPDATE_OWN = 'event:update:own',
  EVENT_UPDATE_ANY = 'event:update:any',
  EVENT_PUBLISH = 'event:publish',
  EVENT_DELETE = 'event:delete',
  EVENT_CONFIGURE = 'event:configure', // Tickets, donations, etc.

  //  USERS
  USER_READ_OWN = 'user:read:own',
  USER_UPDATE_OWN = 'user:update:own',
  USER_READ_ALL = 'user:read:all',
  USER_UPDATE_ROLE = 'user:update:role',
  USER_LIST_ALL = 'user:list:all',
  USER_SUSPEND = 'user:suspend',
  USER_BAN = 'user:ban',
  USER_CHANGE_ROLE = 'user:change:role',

  //  WAITLIST
  WAITLIST_SUBMIT = 'waitlist:submit',
  WAITLIST_READ_ALL = 'waitlist:read:all',
  WAITLIST_APPROVE = 'waitlist:approve',

  //  VOTES & DONATIONS
  VOTE_ANONYMOUS = 'vote:anonymous',
  VOTE_AUTHENTICATED = 'vote:authenticated',
  VOTE_VIEW_RESULTS = 'vote:view:results',
  DONATION_SUBMIT = 'donation:submit',
  DONATION_VIEW_ALL = 'donation:view:all',

  // MODERATION
  MODERATION_VIEW_LOGS = 'moderation:view:logs',
  MODERATION_CREATE_LOG = 'moderation:create:log',

  //  COMMENTS
  COMMENT_CREATE = 'comment:create',
  COMMENT_MODERATE = 'comment:moderate',

  //  ANALYTICS
  ANALYTICS_VIEW_BLOG = 'analytics:view:blog',
  ANALYTICS_VIEW_EVENTS = 'analytics:view:events',
  ANALYTICS_VIEW_ALL = 'analytics:view:all',
  ANALYTICS_EXPORT = 'analytics:export',
}
