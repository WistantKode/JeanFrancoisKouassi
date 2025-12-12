# 📋 Guide d'utilisation - Collection Insomnia JFK Backend

## 🚀 Importation

1. Ouvrir Insomnia
2. Cliquer sur **Create** → **Import From** → **File**
3. Sélectionner le fichier `insomnia-tests-complete.json`
4. La collection apparaît dans le workspace

## 🔧 Configuration de l'environnement

L'environnement de base est préconfiguré avec :
- `base_url`: `http://localhost:3001`
- Variables pour stocker les tokens et IDs

### Variables disponibles :
- `access_token_member` - Token du membre
- `refresh_token_member` - Refresh token du membre
- `access_token_moderator` - Token du modérateur
- `access_token_blog_admin` - Token de l'admin blog
- `access_token_event_admin` - Token de l'admin événements
- `access_token_super_admin` - Token du super admin
- `user_id_member` - ID de l'utilisateur membre
- `article_id` - ID d'un article créé
- `verification_token` - Token de vérification email

## 📝 Extraction automatique des tokens

Pour extraire automatiquement les tokens des réponses, ajouter des **Response Tags** dans Insomnia :

### Pour les requêtes de Login/Verify Email :

1. Ouvrir la requête (ex: "6. Login - Member")
2. Aller dans l'onglet **Tests** (ou **Response Tags**)
3. Ajouter ce code pour extraire les tokens :

```javascript
// Extraire access token et refresh token
const response = await insomnia.response.json();
if (response.accessToken) {
  insomnia.environment.set('access_token_member', response.accessToken);
}
if (response.refreshToken) {
  insomnia.environment.set('refresh_token_member', response.refreshToken);
}
if (response.user?.id) {
  insomnia.environment.set('user_id_member', response.user.id);
}
```

### Pour les requêtes de Refresh :

```javascript
const response = await insomnia.response.json();
if (response.accessToken) {
  insomnia.environment.set('access_token_member', response.accessToken);
}
if (response.refreshToken) {
  insomnia.environment.set('refresh_token_member', response.refreshToken);
}
```

### Pour les requêtes de création d'article :

```javascript
const response = await insomnia.response.json();
if (response.id) {
  insomnia.environment.set('article_id', response.id);
}
```

## 🎯 Ordre d'exécution recommandé

### 1. Setup initial (créer les utilisateurs)

1. **Register - Member** → Note le token de vérification depuis l'email (ou DB)
2. **Register - Moderator** → Note le token
3. **Register - Blog Admin** → Note le token
4. **Register - Super Admin** → Note le token

### 2. Vérification des emails

5. **Verify Email** (pour chaque utilisateur) → Sauvegarde les tokens automatiquement

### 3. Connexions

6. **Login - Member** → Sauvegarde `access_token_member` et `refresh_token_member`
7. **Login - Moderator** → Sauvegarde les tokens
8. **Login - Blog Admin** → Sauvegarde les tokens
9. **Login - Super Admin** → Sauvegarde les tokens

### 4. Tests de refresh

10. **Refresh Token - Member** → Teste la rotation des tokens
11. **Refresh Token - Super Admin** → Teste la rotation

### 5. Tests utilisateurs

12. **Get My Profile** → Récupère le profil du membre
13. **Update My Profile** → Met à jour le profil
14. **List All Users** → Liste tous les utilisateurs (admin)
15. **Change User Role** → Change le rôle d'un utilisateur (super admin)

### 6. Tests articles

16. **Create Article** → Crée un article (blog admin)
17. **List All Articles** → Liste les articles (public)
18. **Get Article by ID** → Récupère un article
19. **Update Article** → Met à jour l'article
20. **Delete Article** → Supprime l'article

### 7. Tests de sécurité

21. **Register - Weak Password** → Doit échouer (validation)
22. **Register - Invalid Email** → Doit échouer (validation)
23. **Refresh - Invalid Token** → Doit retourner 401
24. **Access Protected Route - No Token** → Doit retourner 401
25. **Change Role - Unauthorized** → Doit retourner 403

## 🔑 Création manuelle d'utilisateurs avec rôles

Pour créer des utilisateurs avec des rôles spécifiques, il faut :

1. **Créer l'utilisateur** via `/auth/register`
2. **Vérifier l'email** via `/auth/verify-email`
3. **Se connecter en tant que super admin**
4. **Changer le rôle** via `PATCH /users/{id}/role` avec le body :
   ```json
   {
     "role": "MODERATOR" | "BLOG_ADMIN" | "EVENT_ADMIN" | "SUPER_ADMIN"
   }
   ```

## ⚙️ Feature Flags

Certains endpoints nécessitent des feature flags activés dans l'environnement :

- `ENABLE_USER_ADMIN_ENDPOINTS=true` pour :
  - `GET /users` (liste tous les utilisateurs)
  - `PATCH /users/:id/role` (changer le rôle)

Ajouter cette variable dans votre `.env` backend.

## 🧪 Tests de workflow complets

La collection inclut des workflows complets :

1. **Register → Verify → Login** : Test du flux d'inscription complet
2. **Login → Refresh → Access Protected** : Test du flux d'authentification
3. **Create Article Flow** : Création, lecture, mise à jour, suppression d'article

## 📊 Codes de réponse attendus

- `200` : Succès
- `201` : Créé avec succès
- `400` : Erreur de validation
- `401` : Non authentifié
- `403` : Non autorisé (permissions insuffisantes)
- `404` : Ressource non trouvée
- `409` : Conflit (ex: email déjà utilisé)

## 🐛 Dépannage

### Les tokens ne sont pas sauvegardés automatiquement

- Vérifier que les **Response Tags** sont bien configurés
- Vérifier que l'environnement est bien sélectionné
- Vérifier la structure de la réponse JSON

### Erreur 401 sur les routes protégées

- Vérifier que le token est bien dans l'environnement
- Vérifier que le token n'a pas expiré (utiliser refresh)
- Vérifier le format : `Bearer {token}`

### Erreur 403 sur les routes admin

- Vérifier que l'utilisateur a le bon rôle
- Vérifier que les feature flags sont activés
- Vérifier les permissions dans `permissions.constants.ts`

### Erreur 404 sur les feature flags

- Vérifier que `ENABLE_USER_ADMIN_ENDPOINTS=true` dans `.env`
- Redémarrer le serveur après modification du `.env`

## 📚 Ressources

- Documentation Swagger : `http://localhost:3001/api-docs`
- Code source : `apps/api/src/`
- Schema Prisma : `apps/api/prisma/schema.prisma`

