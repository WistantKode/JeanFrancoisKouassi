'use client';

import { type FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroShowcase } from '@/components/sections/hero/HeroShowcase';
import { Particles } from '@/components/ui/particles';
import {SupportersHub} from "@/components/sections/hero/SupportersHub";
import {HeroCTA} from "@/components/sections/hero/HeroCTA";
import {HeroText} from "@/components/sections/hero/HeroText";
import {ScrollIndicator} from "@/components/sections/hero/ScrollIndicator";

/**
  Composant principal de la section Hero (haut de page).

  Orchestre les éléments visuels majeurs :
  - Arrière-plan animé (Particules + Formes flottantes)
  - Titre et CTA avec révélation progressive
  - Showcase interactif (3-card spread)

  Sert de point d'entrée visuel pour capturer l'attention de l'utilisateur dès l'arrivée.
 */
export const Hero: FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      {/* Creative Floating Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full border border-primary/20 bg-primary/2 dark:bg-primary/5 blur-3xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${10 + i * 20}%`,
              left: `${5 + i * 20}%`,
            }}
          />
        ))}

        {/* Orbiting Ring Element */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full border border-primary/[0.03] -z-10"
        />
      </div>
      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={60}
        staticity={50}
        color="#009e60"
        refresh
      />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12" />
          {/* Title with Multi-Font Staggered Reveal */}
           <HeroText/>
          {/* CTA with refined button */}
          <HeroCTA/>
          {/* Supporter Hub */}
          <SupportersHub/>
        </div>
        <HeroShowcase />
      </div>

      {/* Floating Scroll Indicator */}
      <ScrollIndicator/>
    </section>
  );
};
