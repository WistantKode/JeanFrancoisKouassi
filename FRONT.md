# 🎨 JFK Frontend - Plan d'Implémentation Premium

> **Objectif :** Landing page ultra-premium style Webflow/Awwwards
> **Stack :** Next.js 15 + Tailwind + Shadcn + Framer Motion
> **Perf :** Animations GPU-only (transform/opacity), lazy loading, code splitting

---

## 📐 Structure des Sections (Landing Page)

### 1. 🦸 Hero Section

- Titre typographique XXL avec gradient animé
- Sous-titre fade-in séquencé
- 2 CTA : "Rejoindre" (primary) + "Découvrir" (outline)
- Background : Mesh gradient animé ou particles subtiles
- Photo JFK en overlay/parallax

### 2. 👁️ Vision Section

- Layout : Alternance Image/Texte (zigzag)
- 3-4 blocs "Vision" avec :
  - Photo (reveal au scroll avec clip-path)
  - Titre + Texte (fade-up séquencé)
  - Icône animée
- Animations : Parallax, Stagger, Scale on scroll
- Technique : `useInView` + Framer Motion variants

### 3. 📋 Programme Section (Bento Grid)

- Grid style Apple/Linear (cards asymétriques)
- Chaque card = 1 axe du programme
- Hover : Scale + Glow + Reveal du contenu
- Animation : Stagger reveal au scroll

### 4. 🤝 Rejoindre Section (Multi-Step Form)

- Formulaire en 3-4 étapes visuelles
- Progress bar animée
- Étapes :
  1. Infos personnelles (Nom, Email, Téléphone)
  2. Localisation (Ville, Région)
  3. Motivation (Textarea)
  4. Confirmation + Submit
- Animations : Slide transition entre étapes
- Validation : Zod + React Hook Form

### 5. 💰 Dons Section

- Cards montants prédéfinis (1000, 5000, 10000 XOF)
- Option montant custom
- Bouton CTA glow animé
- Confetti animation on success (optionnel)

### 6. 📧 Footer

- Links structurés (Legal, Social, Contact)
- Newsletter mini-form
- Copyright + Logo

---

## 🎬 Animations (Performance-First)

| Animation | Technique | GPU? |
|-----------|-----------|------|
| Fade Up | `opacity` + `translateY` | ✅ |
| Parallax | `translateY` based on scroll | ✅ |
| Scale on hover | `scale` | ✅ |
| Stagger reveal | Framer variants + delay | ✅ |
| Clip-path reveal | `clip-path` | ✅ |
| Gradient animate | CSS `background-position` | ✅ |

**Règle :** Jamais de `width`, `height`, `top`, `left` animés.

---

## 📂 Structure Fichiers

components/
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Vision.tsx
│   ├── Programme.tsx
│   ├── Rejoindre.tsx
│   └── Dons.tsx
├── ui/           # Shadcn
└── shared/
    ├── AnimatedSection.tsx
    └── ParallaxImage.tsx
```

---

## ✅ Checklist

### Phase 1: Foundations ✅

- [x] Tailwind design system
- [x] Shadcn components
- [x] Utils (cn)

### Phase 2: Layout & Hero

- [ ] Navbar (glassmorphism, sticky)
- [ ] Hero Section complet
- [ ] Footer

### Phase 3: Sections

- [ ] Vision Section (photos + animations)
- [ ] Programme Section (bento grid)

### Phase 4: Interactivité

- [ ] Rejoindre (multi-step form)
- [ ] Dons Section

### Phase 5: Polish

- [ ] SEO (meta, OG)
- [ ] Performance audit
- [ ] Mobile responsive

---

**Prêt pour Phase 2 ?**
