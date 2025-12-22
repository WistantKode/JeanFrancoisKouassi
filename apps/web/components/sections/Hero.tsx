'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HeroPhoto } from '@/components/shared';
import { HeroAvatars } from '@/components/sections/hero/HeroAvatars';
import { GradientBars } from '@/components/ui/gradient-bars';
import { LANDING_CONTENT } from '@/config/landing';

import { Particles } from '@/components/ui/particles';

export const Hero: FC = () => {
  const { title, cta } = LANDING_CONTENT.hero;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      {/* Immersive Local Particles */}
      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={60}
        staticity={50}
        color="#009e60"
        refresh
      />

      {/* No local backgrounds - the global PageBackground handles it */}

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12" />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-12"
          >
            {title.prefix}<br /> 
            <span className="inline-block mt-4 text-4xl sm:text-5xl md:text-6xl text-foreground font-black italic relative w-fit mx-auto">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent opacity-90 select-none">
                 L&apos;Espoir de toute une Génération
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
            Au-delà des promesses, une ambition concrète. Nous bâtissons aujourd&apos;hui la Côte d&apos;Ivoire de demain : audacieuse, souveraine et connectée à son génie.
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
                L&apos;élan d&apos;une Nation
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

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 font-bold">Découvrir</span>
        <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="w-5 h-8 rounded-full border border-primary/30 flex justify-center p-1"
        >
           <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
