# Backend Remediation Plan (NestJS / Prisma / Postgres)

Objectif : durcir sécurité, robustesse, scalabilité et DX avant d’exposer le front. Plan en étapes courtes et priorisées.

## 0. Constats clés (État initial vs Actuel)
- [x] Config JWT incohérente : CORRIGÉ.
- [x] Stratégie JWT entité complète : CORRIGÉ (Payload minimal).
- [ ] Pas de refresh/logout/resend/reset : Partiellement corrigé (Refresh OK, le reste MANQUE).
- [ ] Feature flags non validés : Toujours d'actualité.
- [ ] Décorateur `Roles` mal typé : Toujours d'actualité (`string[]` vs `UserRole`).
- [x] URL d’email hardcodée : CORRIGÉ.
- [ ] Lint/Tests : Toujours rouge.
- [ ] Sécurité (CORS/Throttling) : Pas de Throttling vu sur Auth.

## 1. Sécurité & Auth (priorité) - [EN COURS]
1. [x] Aligner variables JWT : `JWT_ACCESS_TOKEN_EXPIRES_IN` utilisé.
2. [x] Supprimer le fallback secret : Utilisation de `getOrThrow`.
3. [x] `JwtStrategy.validate` payload minimal (`sub`, `email`, `role`).
4. Compléter les endpoints Auth :
   - [x] `POST /auth/refresh` (Rotation OK).
   - [x] `POST /auth/logout` (Révocation effective token en DB).
   - [x] `POST /auth/resend-verification`.
   - [x] `POST /auth/forgot-password`.
   - [x] `POST /auth/reset-password`.
5. [ ] Ajouter `/auth/me` (indispensable pour le front).
6. [ ] Harmoniser `Roles` decorator : Il accepte `string[]`, il DOIT accepter `UserRole[]` uniquement pour la type-safety.
7. [x] `verificationUrl` configurable via `FRONT_URL`.
8. Ajouter guards manquants :
   - [ ] `ThrottlerGuard` sur login/refresh/forgot (Anti-Bruteforce).
9. [ ] Tests Unit/E2E sur les nouveaux flux (Login/Refresh/Register).

## 2. Config & Validation
1. Étendre `ConfigModule` schema (Joi) : CORS_ORIGIN, FRONT_URL, feature flags utilisés, mail vars, JWT vars cohérents.
2. CORS dynamique par env (dev/stage/prod) + allow credentials seulement si nécessaire.
3. Séparer configs par env (`config/*.ts`) et documenter un `.env.example`.

## 3. Observabilité & Erreurs
1. Activer `nestjs-pino` en logger global (JSON en prod, pretty en dev).
2. Ajouter un `HttpExceptionFilter` global pour normaliser les réponses d’erreur (code, message, correlation id).
3. Ajouter un middleware de correlation id (req-id) et log context (userId, route, duration).
4. Health checks : `/health` (liveness) et `/ready` (db + mail + env) via `@nestjs/terminus`.

## 4. Robustesse Base de Données
1. Vérifier/indexer les colonnes fréquemment filtrées : users(email), articles(slug), tokens(userId, expiresAt), createdAt pour order.
2. Ajouter retry/backoff sur Prisma (middleware ou pool config) et timeouts raisonnables.
3. Mettre en place migrations traçables (Prisma migrate) + script de seed minimal (roles, permissions, admin).
4. Prévoir un soft-delete ou status pour entités sensibles.
5. Limiter `select` sur Prisma pour éviter surfetch.

## 5. API Design & Fiabilité
1. Paginer toutes les listes (articles, users, logs).
2. Idempotence sur endpoints sensibles (register operations).
3. Normaliser codes HTTP et messages.
4. Ajouter validation stricte DTO côté admin `PartialType`.
5. Swagger : sécuriser avec bearer auth par défaut, exemples exhaustifs.

## 6. Performance & Charge (30k users)
1. Activer compression et sécurité (Helmet, CSP).
2. Tuning Pool Postgres.
3. Caching applicatif léger (Redis ou in-memory pour listes publiques).
4. Optimisation requêtes Prisma (N+1).
5. Offloader emails et tâches lourdes dans une queue (BullMQ).

## 7. Tests & Qualité
1. Corriger lint existant.
2. Taux de couverture > 80% sur Auth/Core modules.
3. E2E Jest : scénarios complets (Happy path + Edge cases).
4. Tests de charge (k6).

## 8. CI/CD
1. Pipeline strict : Lint -> Test -> Build.
2. Audit de sécurité auto (npm audit).
3. Génération types front automatique.

## 9. Plan d’exécution révisé
1. **FINIR STEP 1** : Logout, Reset Pwd, Me, Decorator Typé, Throttling.
2. Config validée & Observabilité (Logs/Erreurs).
3. DB Hardening & Seeds.
4. Tests E2E Auth.
