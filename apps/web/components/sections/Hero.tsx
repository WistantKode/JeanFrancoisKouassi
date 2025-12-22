'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HeroPhoto } from '@/components/shared';
import { HeroAvatars } from '@/components/sections/hero/HeroAvatars';
import { GradientBars } from '@/components/ui/gradient-bars';
import { LANDING_CONTENT } from '@/config/landing';
import { SupporterCounter } from './hero/SupporterCounter';

export const Hero: FC = () => {
  const { title, subtitle, stats, cta } = LANDING_CONTENT.hero;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      {/* Premium Background Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
         {/* Noise Filter Background - like app-hero.tsx */}
         <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none mix-blend-overlay">
           <svg className="h-full w-full">
              <filter id="hero-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#hero-noise)" />
           </svg>
         </div>

         {/* Custom Gradient Bars with CI colors - increased presence */}
         <div className="opacity-40 dark:opacity-30 scale-125 blur-[3px]">
            <GradientBars />
         </div>
         
         {/* Multi-layered overlays for depth */}
         <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(var(--primary-rgb),0.15),transparent_60%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(var(--secondary-rgb),0.1),transparent_50%)]" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Interactive Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HeroAvatars />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
          >
            {title.prefix}{' '}
            <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl text-foreground font-black italic relative w-fit mx-auto">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent opacity-90 select-none">
                 L'Espoir de toute une Génération
              </span>
              {/* Full decorative underline */}
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ delay: 0.8, duration: 1 }}
                 className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full opacity-80" 
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          >
            Au-delà des promesses, une ambition concrète. Nous bâtissons aujourd'hui la Côte d'Ivoire de demain : audacieuse, souveraine et connectée à son génie.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 text-base gap-2">
              {cta.primary} <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 text-base">
              {cta.secondary}
            </Button>
          </motion.div>

          {/* Revolutionary Supporter Hub */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center gap-6 mb-20"
          >
            <HeroAvatars />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary/80">
                L'élan d'une Nation
              </p>
              <div className="flex items-center gap-4 text-muted-foreground/60 text-xs font-semibold uppercase tracking-widest">
                <span>50K+ Citoyens Engagés</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>16 Régions Unies</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>1 Vision Unique</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Photos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center items-end gap-6 relative"
          style={{ perspective: '1000px' }}
        >
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-[80px] -z-10" />
          
          <HeroPhoto 
            src="/doctor1.png" 
            alt="Jean-François Kouassi" 
            priority 
            className="border-0 shadow-2xl shadow-primary/10"
          />
          <HeroPhoto 
            src="/doctor2.png" 
            alt="JFK en action" 
            priority
            className="hidden sm:block border-0 shadow-2xl shadow-secondary/10 translate-y-8" 
          />
        </motion.div>
      </div>
    </section>
  );
};
