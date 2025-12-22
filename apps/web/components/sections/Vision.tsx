'use client';

import { type FC } from 'react';
import { 
  HeartPulse, 
  Lightbulb, 
  Users, 
  GraduationCap, 
  Sprout, 
  Building2 
} from 'lucide-react';
import { VisionHeader, VisionCard } from '@/components/sections/vision';
import { cn } from '@/lib/utils';
import { type VisionCardProps } from '@/components/sections/vision/VisionCard';

// Vision Data - 6 Key Pillars
const VISION_ITEMS: readonly VisionCardProps[] = [
  {
    icon: HeartPulse,
    title: 'Santé pour Tous',
    description: "Garantir l'accès aux soins de qualité pour chaque Ivoirien, moderniser les hôpitaux et valoriser le personnel médical.",
  },
  {
    icon: GraduationCap,
    title: 'Éducation d\'Excellence',
    description: "Réformer le système éducatif pour former les leaders de demain, avec un accent sur le numérique et l'entrepreneuriat.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Tech',
    description: "Faire de la Côte d'Ivoire le hub technologique régional en soutenant les startups et la digitalisation de l'État.",
  },
  {
    icon: Sprout,
    title: 'Agriculture Moderne',
    description: "Transformer notre agriculture locale grâce à la technologie pour assurer la sécurité alimentaire et l'exportation.",
  },
  {
    icon: Building2,
    title: 'Infrastructures',
    description: "Développer des infrastructures durables et interconnectées pour désenclaver les régions et booster l'économie.",
  },
  {
    icon: Users,
    title: 'Unité Nationale',
    description: "Promouvoir le dialogue, la réconciliation et l'égalité des chances pour bâtir une paix durable et inclusive.",
  },
] as const;

export const Vision: FC = () => {
  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] opacity-40" />

      <div className="section-container">
        {/* Header */}
        <VisionHeader
          title="Une Vision Audacieuse"
          subtitle="Nous ne proposons pas simplement des réformes, mais une transformation profonde de notre société, basée sur 6 piliers fondamentaux."
          badge="Notre Programme"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {VISION_ITEMS.map((item, index) => (
            <VisionCard
              key={item.title}
              {...item}
              delay={index * 0.1} // Stagger effect
            />
          ))}
        </div>
      </div>
    </section>
  );
};
