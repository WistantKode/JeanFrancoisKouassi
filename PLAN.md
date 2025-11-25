# PLAN STRATÉGIQUE & TECHNIQUE - PROJET JFK

## 1. Contexte & Objectifs
Le projet consiste à développer la plateforme de campagne pour Jean-François Kouassi (JFK).
**Objectifs clés :**
- **Visibilité (SEO)** : Indexation parfaite et partage social optimisé (Côte d'Ivoire).
- **Sécurité** : Backend robuste et sécurisé dès le départ.
- **UX/UI** : Design moderne, rassurant et professionnel (Thème : Santé, Innovation, Unité).
- **Architecture** : Codebase propre, modulaire et maintenable (Monorepo Turborepo).

## 2. Stratégie Structurelle (Monorepo)
Nous utilisons **Turborepo** avec **pnpm**.

### Structure des Applications (`apps/`)
- **`apps/web` (Existant)** : Frontend Next.js. Sera adapté pour la Landing Page.
- **`apps/api` (À créer)** : Backend NestJS. Servira d'API pour les adhésions et autres fonctionnalités.
- **`apps/docs` (Existant)** : Documentation (peut être conservé ou ignoré selon besoin).

### Structure des Packages (`packages/`)
- Utilisation des packages partagés pour les configurations (TypeScript, ESLint) et potentiellement l'UI (`@repo/ui`) si des composants sont réutilisables.

## 3. Stratégie Technique

### A. Backend (NestJS) - "Sécurité & Robustesse"
*Objectif : API sécurisée pour la gestion des adhérents.*

1.  **Initialisation** : Création d'une application NestJS standard dans `apps/api`.
2.  **Sécurité (Pillier 2)** :
    -   **Helmet** : Protection des headers HTTP.
    -   **CORS** : Restriction stricte aux origines autorisées (Frontend).
    -   **Throttler (Rate Limiting)** : Protection contre le spam/brute-force.
3.  **Architecture & Validation (Pillier 3)** :
    -   **Module Pattern** : Séparation stricte (Module, Controller, Service).
    -   **DTOs & Validation** : Utilisation de `class-validator` et `class-transformer` pour valider toutes les entrées.
    -   **Global Pipes** : Validation automatique activée globalement.

### B. Frontend (Next.js) - "SEO & UX"
*Objectif : Landing page performante et esthétique.*

1.  **SEO & Social (Pillier 1)** :
    -   **Metadata API** : Configuration dynamique des titres, descriptions, keywords.
    -   **Open Graph** : Images de partage optimisées pour WhatsApp/Facebook.
    -   **Performance** : Utilisation intensive de `next/image` pour le LCP (Largest Contentful Paint).
2.  **UX/UI (Design Guide)** :
    -   **Palette** : Blanc cassé, Vert (#009E60), Orange (#F77F00).
    -   **Typographie** : Sans-serif propre (Poppins/Montserrat + Roboto).
    -   **Composants** : Header, Hero Section, Impact (Stats), Vision (Zig-Zag).
    -   **Tech** : Tailwind CSS (recommandé pour la rapidité et la performance).

## 4. Plan d'Action (Roadmap)

### Phase 1 : Initialisation & Backend Core
- [ ] Créer l'application NestJS dans `apps/api`.
- [ ] Configurer le proxy ou les ports pour le développement local (Turbo).
- [ ] Implémenter le module "Adherents" (Squelette).

### Phase 2 : Sécurisation Backend
- [ ] Installer et configurer `helmet` et `cors`.
- [ ] Mettre en place `class-validator` et les DTOs.
- [ ] Configurer le Rate Limiting (`@nestjs/throttler`).

### Phase 3 : Frontend SEO & Structure
- [ ] Nettoyer `apps/web` (supprimer le boilerplate).
- [ ] Configurer le `layout.tsx` (Metadata, Fontes).
- [ ] Mettre en place les balises Open Graph.

### Phase 4 : Frontend UI & Intégration
- [ ] Implémenter le Design System (Couleurs, Typos) dans Tailwind.
- [ ] Créer les sections : Header, Hero, Stats, Vision.
- [ ] Connecter le formulaire d'adhésion à l'API (si applicable dans cette itération).

### Phase 5 : Vérification & Optimisation
- [ ] Audit Lighthouse (Performance, SEO).
- [ ] Test de sécurité (Tentative d'injection, Spam).
- [ ] Validation visuelle (Mobile/Desktop).
