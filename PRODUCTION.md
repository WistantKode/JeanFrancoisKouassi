# 🚀 Guide de Déploiement en Production

## 📋 Commandes disponibles

### Build et démarrage en production

```bash
# 1. Builder toutes les applications
pnpm build

# 2. Lancer tous les serveurs en production
pnpm start:prod
```

**OU en une seule commande** (le build est automatique avec `start:prod`) :

```bash
pnpm start:prod
```

### Commandes individuelles

```bash
# Builder une app spécifique
pnpm --filter api build
pnpm --filter web build
pnpm --filter docs build

# Lancer une app spécifique en production
pnpm --filter api start:prod
pnpm --filter web start:prod
pnpm --filter docs start:prod
```

## 🌐 Ports par défaut

| Application | Port | URL |
|------------|------|-----|
| **API** (NestJS) | `3001` | `http://localhost:3001` |
| **Web** (Next.js) | `3000` | `http://localhost:3000` |
| **Docs** (Next.js) | `3002` | `http://localhost:3002` |

## ⚙️ Configuration requise

### Variables d'environnement

Chaque application nécessite son fichier `.env` :

#### `apps/api/.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/jfk_db
PORT=3001
CORS_ORIGIN=http://localhost:3000,http://localhost:3002
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
FRONT_URL=http://localhost:3000
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-email@example.com
MAIL_PASSWORD=your-password
MAIL_FROM_NAME=JFK Campaign
MAIL_FROM_EMAIL=noreply@jfk.ci
ENABLE_USER_ADMIN_ENDPOINTS=true
```

#### `apps/web/.env`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### `apps/docs/.env`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📦 Prérequis

1. **Node.js** >= 18
2. **pnpm** >= 9.0.0
3. **PostgreSQL** (pour l'API)
4. **Base de données** créée et migrations appliquées

## 🔧 Étapes de déploiement

### 1. Installation des dépendances

```bash
pnpm install
```

### 2. Configuration de la base de données

```bash
cd apps/api
pnpm prisma generate
pnpm prisma migrate deploy
```

### 3. Build de toutes les applications

```bash
# Depuis la racine
pnpm build
```

### 4. Démarrage en production

```bash
# Depuis la racine
pnpm start:prod
```

## 🐳 Déploiement avec Docker (optionnel)

### Dockerfile pour chaque app

Créez un `Dockerfile` dans chaque app si nécessaire :

#### `apps/api/Dockerfile`
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter api build

FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/apps/api/package.json ./
RUN pnpm install --frozen-lockfile --prod
RUN pnpm prisma generate
CMD ["node", "dist/main.js"]
```

#### `apps/web/Dockerfile`
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter web build

FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./
RUN pnpm install --frozen-lockfile --prod
CMD ["pnpm", "start:prod"]
```

## 🔍 Vérification

Une fois tous les serveurs lancés, vérifiez :

- ✅ API : `http://localhost:3001/api-docs` (Swagger)
- ✅ Web : `http://localhost:3000`
- ✅ Docs : `http://localhost:3002`

## 🛠️ Gestion des processus

### Avec PM2 (recommandé pour la production)

```bash
# Installer PM2
npm install -g pm2

# Lancer tous les serveurs
pm2 start ecosystem.config.js

# Voir les logs
pm2 logs

# Arrêter
pm2 stop all
```

### `ecosystem.config.js` (à créer à la racine)

```javascript
module.exports = {
  apps: [
    {
      name: 'jfk-api',
      script: 'node',
      args: 'apps/api/dist/main.js',
      cwd: './apps/api',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jfk-web',
      script: 'pnpm',
      args: 'start:prod',
      cwd: './apps/web',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'jfk-docs',
      script: 'pnpm',
      args: 'start:prod',
      cwd: './apps/docs',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

## 📝 Notes importantes

1. **Ports** : Assurez-vous que les ports 3000, 3001, 3002 sont disponibles
2. **Base de données** : L'API nécessite une connexion PostgreSQL active
3. **Migrations** : Exécutez `pnpm prisma migrate deploy` avant de lancer l'API
4. **Variables d'environnement** : Configurez tous les `.env` avant le démarrage
5. **Build** : Le build est automatique avec `start:prod`, mais vous pouvez builder séparément

## 🚨 Dépannage

### Les serveurs ne démarrent pas

1. Vérifiez que les ports sont libres : `lsof -i :3000,3001,3002`
2. Vérifiez les logs : `pnpm start:prod` affiche les erreurs
3. Vérifiez les variables d'environnement

### Erreur de base de données

```bash
cd apps/api
pnpm prisma generate
pnpm prisma migrate deploy
```

### Erreur de build

```bash
# Nettoyer et rebuilder
rm -rf apps/*/dist apps/*/.next
pnpm build
```

