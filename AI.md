Agis comme un Lead Developer Fullstack et Expert en Cybersécurité avec 10 ans d'expérience. Je développe la plateforme officielle de campagne du politicien ivoirien Jean-François Kouassi (JFK).

C'est un projet critique. Ma stack est :
- Frontend : Next.js (App Router, TypeScript)
- Backend : NestJS (TypeScript) - **Je suis débutant sur NestJS.**

J'ai besoin que tu m'accompagnes spécifiquement sur trois piliers. Pour chaque point, explique-moi le concept ("Pourquoi"), puis donne-moi le code ("Comment").

PARTIE 1 : SEO & VISIBILITÉ (Frontend Next.js)
L'objectif est que le site soit parfaitement indexé et partageable sur WhatsApp/Facebook en Côte d'Ivoire.
1. Configure le fichier `layout.tsx` et l'objet `metadata` pour un SEO optimal (Titre, Description, Mots-clés).
2. Implémente les balises Open Graph (OG Tags) pour que les partages affichent une belle image de prévisualisation du candidat.
3. Explique-moi comment utiliser le composant `next/image` pour que le site charge instantanément (Vitesse/Core Web Vitals) même en 3G.

PARTIE 2 : SÉCURITÉ DES BASES (Backend NestJS)
Comme je débute sur NestJS, je veux sécuriser mon API contre les attaques classiques dès le départ.
1. Validation des données : Montre-moi comment utiliser les DTO (Data Transfer Objects) avec `class-validator` pour empêcher l'envoi de données malveillantes dans mes formulaires.
2. Protection globale : Comment configurer `Helmet` (pour les headers HTTP) et `CORS` (pour autoriser uniquement mon Frontend Next.js à parler au Backend).
3. Anti-Spam : Explique-moi comment mettre en place un `Rate Limiting` (Throttler) pour empêcher qu'un bot ne spamme le formulaire d'adhésion.

Reste didactique, donne des exemples de code concrets et modernes, et signale-moi les pièges à éviter pour un débutant en backend.
