import { 
  HeartPulse, 
  Lightbulb, 
  Users, 
  GraduationCap, 
  Sprout, 
  Building2 
} from 'lucide-react';

export const LANDING_CONTENT = {
  hero: {
    title: {
      prefix: "L'avenir de la",
      highlight: "République de Côte d'Ivoire"
    },
    subtitle: "Un nouveau chapitre s'écrit maintenant. Innovation, transparence et unité pour une nation qui rayonne.",
    stats: [
      { value: '50K+', label: 'Membres' },
      { value: '100+', label: 'Événements' },
      { value: '16', label: 'Régions' },
    ],
    cta: {
      primary: "Je rejoins le mouvement",
      secondary: "Découvrir notre vision"
    },
    avatars: [
      {
        id: 1,
        name: 'Aminata K.',
        designation: 'Militante',
        image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      },
      {
        id: 2,
        name: 'Kouamé B.',
        designation: 'Enseignant',
        image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      },
      {
        id: 3,
        name: 'Fatou D.',
        designation: 'Entrepreneur',
        image: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
      },
      {
        id: 4,
        name: 'Ibrahim S.',
        designation: 'Étudiant',
        image: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
      },
    ]
  },
  vision: {
    badge: "Notre Programme",
    title: "Une Vision Audacieuse",
    subtitle: "Nous ne proposons pas simplement des réformes, mais une transformation profonde de notre société, basée sur 6 piliers fondamentaux.",
    pillars: [
      {
        icon: HeartPulse,
        title: 'Santé pour Tous',
        description: "Garantir l'accès aux soins de qualité pour chaque Ivoirien, moderniser les hôpitaux et valoriser le personnel médical.",
        details: ['Couverture Universelle', 'Hôpitaux Modernes', 'Formation Médicale']
      },
      {
        icon: GraduationCap,
        title: 'Éducation',
        description: "Réformer le système éducatif pour former les leaders de demain, avec un accent sur le numérique et l'entrepreneuriat.",
        details: ['Excellence Académique', 'Digitalisation', 'Formation Pro']
      },
      {
        icon: Lightbulb,
        title: 'Innovation',
        description: "Faire de la Côte d'Ivoire le hub technologique régional en soutenant les startups et la digitalisation de l'État.",
        details: ['Hub Tech Abidjan', 'Startups Fund', 'E-Gouvernance']
      },
      {
        icon: Sprout,
        title: 'Agriculture',
        description: "Transformer notre agriculture locale grâce à la technologie pour assurer la sécurité alimentaire et l'exportation.",
        details: ['Transformation Locale', 'Agri-Tech', 'Soutien Fermiers']
      },
      {
        icon: Building2,
        title: 'Infrastructures',
        description: "Développer des infrastructures durables et interconnectées pour désenclaver les régions et booster l'économie.",
        details: ['Routes Durables', 'Énergie Verte', 'Transport Urbain']
      },
      {
        icon: Users,
        title: 'Unité Nationale',
        description: "Promouvoir le dialogue, la réconciliation et l'égalité des chances pour bâtir une paix durable et inclusive.",
        details: ['Dialogue Social', 'Égalité Chances', 'Paix Durable']
      },
    ]
  },
  waitlist: {
    badge: "Rejoindre",
    title: {
      main: "Rejoignez le",
      highlight: "Mouvement"
    },
    subtitle: "Soyez les premiers à participer à la transformation de la Côte d'Ivoire.\nInscrivez-vous pour devenir bénévole ou recevoir nos actualités.",
    stats: {
      count: "100+",
      label: "déjà inscrits ✨"
    },
    features: [
      {
        icon: 'Sparkles',
        label: "Impact",
        sub: "Réel"
      },
      {
        icon: 'Users',
        label: "Communauté",
        sub: "Engagée"
      },
      {
        icon: 'Star',
        label: "Avenir",
        sub: "Meilleur"
      }
    ]
  }
} as const;
