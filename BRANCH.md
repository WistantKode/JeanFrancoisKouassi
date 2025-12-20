# Stratégie de Branching & Conventions de Nommage

Ce document définit les règles strictes de gestion de versions pour le monorepo (Apps `web` & `api`).

## 1. Branches Principales

| Branche   | Rôle                                                                 | Protection |
|-----------|----------------------------------------------------------------------|------------|
| `main`    | **Production**. Code stable, déployé, versionné.                     | 🔒 Oui      |
| `develop` | **Intégration**. Branche par défaut pour les PRs. Code testable.     | 🔒 Oui      |

## 2. Convention de Nommage des Branches

Le format **OBLIGATOIRE** est :  
`type/scope/description-courte`

### A. Les Types (`type`)
- **`feat`** : Nouvelle fonctionnalité.
- **`fix`** : Correction de bug.
- **`chore`** : Maintenance, config, dépendances (pas de code prod).
- **`refactor`** : Amélioration du code sans changer le comportement (clean up).
- **`docs`** : Documentation uniquement.
- **`test`** : Ajout ou modification de tests.

### B. Les Scopes (`scope`)
Pour identifier immédiatement quelle partie du monorepo est touchée :
- **`web`** : Application Frontend (Next.js).
- **`api`** : Application Backend (NestJS).
- **`ui`** : Librairie de composants partagée (`packages/ui`).
- **`core`** : Configuration globale du monorepo (Turbo, Eslint, TSConfig).

### C. La Description (`description-courte`)
- En **kebab-case** (minuscules, tirets).
- Concise et explicite (anglais ou français, mais cohérent).

### ✅ Exemples Valides
- `feat/web/login-page`
- `fix/api/jwt-validation`
- `feat/ui/button-component`
- `chore/core/update-dependencies`
- `refactor/api/auth-service`

### ❌ Exemples Invalides
- `login-page` (Manque type et scope)
- `feat/login` (Manque scope)
- `feat/web/Login_Page` (Pas de kebab-case)

## 3. Workflow de Développement

1.  **Départ** : Toujours partir de `develop` à jour.
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feat/web/ma-super-feature
    ```

2.  **Commits** : Suivre la convention **Conventional Commits** (voir `ASSIST.md`).
    - Format : `type(scope): message`
    - Exemple : `feat(web): add login form validation`

3.  **Pull Request (PR)** :
    - Cible : `develop`.
    - Titre : Identique au format de commit (ex: `feat(web): implement user authentication`).
    - Validation : Doit passer les tests et le lint CI avant merge.

4.  **Merge** :
    - Stratégie : **Squash and Merge** (pour garder un historique propre sur `develop`).

## 4. Release (Optionnel / Futur)
- Création d'une branche `release/v1.0.0` depuis `develop`.
- Tests finaux.
- Merge vers `main` (avec Tag) et vers `develop`.
