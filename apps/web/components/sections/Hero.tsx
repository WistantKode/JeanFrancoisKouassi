'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HeroPhoto } from '@/components/shared';
import { HeroAvatars } from '@/components/sections/hero/HeroAvatars';
import { GradientBars } from '@/components/ui/gradient-bars';
import { Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LANDING_CONTENT } from '@/config/landing';

// Special font for "Côte d'Ivoire"
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700', '900'] });

export const Hero: FC = () => {
  const { title, subtitle, stats, cta } = LANDING_CONTENT.hero;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
         {/* Custom Gradient Bars with CI colors but desaturated for class */}
         <div className="opacity-20 dark:opacity-10 scale-110">
            <GradientBars />
         </div>
         
         {/* Overlay to ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />
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
            <span className={cn(
              "block mt-2 text-4xl sm:text-5xl md:text-6xl text-foreground font-black italic relative w-fit mx-auto",
              playfair.className
            )}>
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent opacity-90 select-none">
                 {title.highlight}
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
            {subtitle}
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

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto mb-20 border-t border-border/30 pt-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</div>
              </motion.div>
            ))}
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
