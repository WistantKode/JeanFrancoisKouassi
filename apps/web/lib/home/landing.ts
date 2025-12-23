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
      {
        id: 5,
        name: 'Marie-Noëlle L.',
        designation: 'Santé',
        image: 'https://i.pravatar.cc/150?u=a04258114e29026703b',
      },
      {
        id: 6,
        name: 'Ousmane T.',
        designation: 'Commerçant',
        image: 'https://i.pravatar.cc/150?u=a04258114e29026704c',
      },
      {
        id: 7,
        name: 'Yasmine K.',
        designation: 'Avocate',
        image: 'https://i.pravatar.cc/150?u=a04258114e29026705d',
      },
      {
        id: 8,
        name: 'Jean-Charles E.',
        designation: 'Ingénieur',
        image: 'https://i.pravatar.cc/150?u=a04258114e29026706e',
      },
    ],
    social: {
      supporters: 52430,
      volunteers: 1240,
      text: "citoyens déjà engagés pour l'avenir"
    }
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
  },
  faq: {
    badge: "FAQ",
    title: "Questions Fréquentes",
    subtitle: "Tout ce que vous devez savoir sur notre mouvement et notre vision pour la Côte d'Ivoire.",
    items: [
      {
        id: '1',
        question: "Qui est Jean-François Kouassi ?",
        answer: "Jean-François Kouassi est un leader engagé, fort d'une expertise en gestion publique et en innovation technologique, dédié à la transformation positive de la Côte d'Ivoire."
      },
      {
        id: '2',
        question: "Quelles sont les priorités de son programme ?",
        answer: "Notre programme repose sur six piliers : la santé pour tous, l'éducation d'excellence, l'innovation tech, la modernisation agricole, les infrastructures durables et l'unité nationale."
      },
      {
        id: '3',
        question: "Comment puis-je devenir bénévole ?",
        answer: "C'est simple ! Inscrivez-vous via notre formulaire de contact ou rejoignez la newsletter pour être informé des prochaines actions sur le terrain."
      },
      {
        id: '4',
        question: "Comment faire un don à la campagne ?",
        answer: "Les dons peuvent être effectués via notre plateforme sécurisée. Chaque contribution, petite ou grande, aide à porter notre message plus loin."
      },
      {
        id: '5',
        question: "Quel est l'engagement pour la jeunesse ?",
        answer: "La jeunesse est au cœur de notre programme avec des initiatives pour l'entrepreneuriat numérique, l'accès au premier emploi et la formation aux métiers du futur."
      },
      {
        id: '6',
        question: "Où se trouve le quartier général de campagne ?",
        answer: "Notre QG principal est situé à Abidjan, mais nous avons des représentations dans les 16 régions du pays pour rester proches de chaque citoyen."
      }
    ]
  }
} as const;
