# STRATÉGIE DE GESTION DES BRANCHES GIT

## 📋 Vue d'ensemble

Ce document définit la stratégie de branching Git pour le projet JFK Campaign Platform.
Nous utilisons une approche **Git Flow simplifiée** adaptée aux équipes de développement modernes.

---

## 🌳 Structure des Branches

### Branches Principales (Permanentes)

#### 1. `main` (Production)
- **Rôle** : Code en production
- **Protection** : ✅ Protégée (pas de push direct)
- **Déploiement** : Automatique vers production (Vercel/Railway)
- **Merge depuis** : `release/*` ou `hotfix/*` uniquement
- **Tag** : Chaque merge = nouveau tag de version (v1.0.0, v1.1.0, etc.)

#### 2. `develop` (Développement)
- **Rôle** : Branche d'intégration principale
- **Protection** : ✅ Protégée (merge via Pull Request)
- **Déploiement** : Automatique vers staging/preview
- **Merge depuis** : `feature/*`, `bugfix/*`
- **Base pour** : Toutes les nouvelles branches de développement

---

### Branches Temporaires (Supprimées après merge)

#### 3. `feature/*` (Nouvelles fonctionnalités)
- **Nomenclature** : `feature/nom-de-la-fonctionnalite`
- **Créée depuis** : `develop`
- **Mergée dans** : `develop`
- **Durée de vie** : Courte à moyenne (quelques jours à 2 semaines max)
- **Exemples** :
  - `feature/adherent-form`
  - `feature/event-listing`
  - `feature/admin-dashboard`
  - `feature/newsletter-integration`

#### 4. `bugfix/*` (Corrections de bugs)
- **Nomenclature** : `bugfix/description-du-bug`
- **Créée depuis** : `develop`
- **Mergée dans** : `develop`
- **Durée de vie** : Très courte (quelques heures à 2 jours)
- **Exemples** :
  - `bugfix/form-validation-error`
  - `bugfix/mobile-responsive-issue`
  - `bugfix/api-timeout`

#### 5. `hotfix/*` (Corrections urgentes en production)
- **Nomenclature** : `hotfix/description-urgente`
- **Créée depuis** : `main`
- **Mergée dans** : `main` ET `develop`
- **Durée de vie** : Très courte (quelques heures)
- **Tag** : Incrémente la version patch (v1.0.0 → v1.0.1)
- **Exemples** :
  - `hotfix/critical-security-patch`
  - `hotfix/payment-gateway-down`
  - `hotfix/database-connection-error`

#### 6. `release/*` (Préparation de release)
- **Nomenclature** : `release/v1.0.0`
- **Créée depuis** : `develop`
- **Mergée dans** : `main` ET `develop`
- **Durée de vie** : Courte (1-3 jours)
- **Objectif** : Tests finaux, corrections mineures, bump de version
- **Exemples** :
  - `release/v1.0.0`
  - `release/v1.1.0`
  - `release/v2.0.0`

#### 7. `chore/*` (Tâches techniques)
- **Nomenclature** : `chore/description-tache`
- **Créée depuis** : `develop`
- **Mergée dans** : `develop`
- **Exemples** :
  - `chore/update-dependencies`
  - `chore/improve-ci-pipeline`
  - `chore/refactor-api-structure`

---

## 🔄 Workflow de Développement

### Scénario 1 : Développer une nouvelle fonctionnalité

```bash
# 1. Mettre à jour develop
git checkout develop
git pull origin develop

# 2. Créer une branche feature
git checkout -b feature/adherent-form

# 3. Développer et commiter
git add .
git commit -m "feat(adherents): add adherent registration form"

# 4. Pousser la branche
git push origin feature/adherent-form

# 5. Créer une Pull Request sur GitHub
# develop ← feature/adherent-form

# 6. Après review et merge, supprimer la branche locale
git checkout develop
git pull origin develop
git branch -d feature/adherent-form
```

### Scénario 2 : Corriger un bug

```bash
# 1. Mettre à jour develop
git checkout develop
git pull origin develop

# 2. Créer une branche bugfix
git checkout -b bugfix/form-validation-error

# 3. Corriger et commiter
git add .
git commit -m "fix(forms): correct email validation regex"

# 4. Pousser et créer PR
git push origin bugfix/form-validation-error

# 5. Merger dans develop via PR
```

### Scénario 3 : Préparer une release

```bash
# 1. Créer la branche release depuis develop
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# 2. Bump version dans package.json
# Modifier les fichiers de version

# 3. Tests finaux et corrections mineures
git add .
git commit -m "chore(release): bump version to 1.0.0"

# 4. Merger dans main
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# 5. Merger dans develop
git checkout develop
git merge release/v1.0.0
git push origin develop

# 6. Supprimer la branche release
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

### Scénario 4 : Hotfix urgent en production

```bash
# 1. Créer hotfix depuis main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-patch

# 2. Corriger le problème
git add .
git commit -m "fix(security): patch XSS vulnerability"

# 3. Merger dans main
git checkout main
git merge hotfix/critical-security-patch
git tag -a v1.0.1 -m "Hotfix: Security patch"
git push origin main --tags

# 4. Merger dans develop
git checkout develop
git merge hotfix/critical-security-patch
git push origin develop

# 5. Supprimer la branche hotfix
git branch -d hotfix/critical-security-patch
```

---

## 📝 Conventions de Nommage

### Format des branches

```
<type>/<description-en-kebab-case>
```

**Types autorisés :**
- `feature/` : Nouvelle fonctionnalité
- `bugfix/` : Correction de bug
- `hotfix/` : Correction urgente production
- `release/` : Préparation de release
- `chore/` : Tâche technique
- `docs/` : Documentation uniquement
- `refactor/` : Refactoring sans changement fonctionnel
- `test/` : Ajout/modification de tests

**Exemples valides :**
- ✅ `feature/user-authentication`
- ✅ `bugfix/navbar-mobile-menu`
- ✅ `hotfix/payment-api-timeout`
- ✅ `release/v2.0.0`
- ✅ `chore/update-nestjs-dependencies`

**Exemples invalides :**
- ❌ `feature/UserAuthentication` (pas de camelCase)
- ❌ `fix-bug` (manque le type)
- ❌ `feature/add_user_auth` (underscore au lieu de tiret)

---

## 🔒 Règles de Protection des Branches

### Branch `main`
- ✅ Require pull request reviews (1 minimum)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Include administrators
- ❌ Allow force pushes
- ❌ Allow deletions

### Branch `develop`
- ✅ Require pull request reviews (1 minimum)
- ✅ Require status checks to pass
- ❌ Allow force pushes
- ❌ Allow deletions

---

## ✅ Checklist avant de Merger

### Pour toute Pull Request

- [ ] Le code compile sans erreur
- [ ] Les tests passent (`pnpm test`)
- [ ] Le linting passe (`pnpm lint`)
- [ ] Les types TypeScript sont corrects (`pnpm check-types`)
- [ ] Le code est documenté (commentaires, JSDoc si nécessaire)
- [ ] Les commits suivent la convention (feat, fix, chore, etc.)
- [ ] La PR a une description claire
- [ ] Les conflits sont résolus
- [ ] Au moins 1 review approuvée

### Pour merge dans `main`

- [ ] Tous les tests e2e passent
- [ ] L'application fonctionne en staging
- [ ] La documentation est à jour
- [ ] Le CHANGELOG est mis à jour
- [ ] La version est bumpée
- [ ] Les variables d'environnement sont documentées

---

## 🏷️ Versioning (Semantic Versioning)

Format : `MAJOR.MINOR.PATCH` (ex: v1.2.3)

- **MAJOR** : Changements incompatibles (breaking changes)
- **MINOR** : Nouvelles fonctionnalités (rétrocompatibles)
- **PATCH** : Corrections de bugs

**Exemples :**
- `v1.0.0` → `v1.0.1` : Hotfix
- `v1.0.1` → `v1.1.0` : Nouvelle fonctionnalité
- `v1.1.0` → `v2.0.0` : Breaking change

---

## 🚀 Déploiement Automatique

### Environnements

| Branche | Environnement | URL | Déploiement |
|---------|---------------|-----|-------------|
| `main` | Production | https://jfk-campaign.ci | Auto (Vercel) |
| `develop` | Staging | https://staging.jfk-campaign.ci | Auto (Vercel) |
| `feature/*` | Preview | https://feature-xxx.vercel.app | Auto (Vercel) |

---

## 📊 Diagramme de Flux

```
main (production)
  │
  ├─── hotfix/critical-fix ──┐
  │                           │
  │                           ↓
  │                         merge
  │                           │
  └─────────────────────────┘
  │
  ↓
develop (staging)
  │
  ├─── feature/new-feature ──┐
  │                           │
  ├─── bugfix/fix-issue ─────┤
  │                           │
  ├─── chore/refactor ───────┤
  │                           │
  │                           ↓
  │                         merge
  │                           │
  └─────────────────────────┘
  │
  ↓
release/v1.0.0
  │
  ├─── merge to main ────────→ main (tag v1.0.0)
  │
  └─── merge back to develop → develop
```

---

## 🛠️ Commandes Utiles

### Lister toutes les branches

```bash
# Locales
git branch

# Distantes
git branch -r

# Toutes
git branch -a
```

### Supprimer une branche

```bash
# Locale
git branch -d feature/my-feature

# Distante
git push origin --delete feature/my-feature
```

### Nettoyer les branches obsolètes

```bash
# Supprimer les branches locales déjà mergées
git branch --merged | grep -v "\*" | grep -v "main" | grep -v "develop" | xargs -n 1 git branch -d

# Nettoyer les références distantes
git fetch --prune
```

### Synchroniser avec develop

```bash
# Depuis votre branche feature
git checkout feature/my-feature
git fetch origin
git rebase origin/develop
```

---

## 📚 Ressources

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Date de création :** 25 novembre 2024  
**Dernière mise à jour :** 25 novembre 2024  
**Version :** 1.0
