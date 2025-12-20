'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { UserAvatar, HeroPhoto } from '@/components/shared';

// ============================================
// TYPES
// ============================================

interface Supporter {
  name: string;
}

interface Stat {
  value: string;
  label: string;
}

// ============================================
// DATA
// ============================================

const SUPPORTERS: readonly Supporter[] = [
  { name: 'Aminata K.' },
  { name: 'Kouamé B.' },
  { name: 'Fatou D.' },
  { name: 'Ibrahim S.' },
  { name: 'Marie-Anne T.' },
] as const;

const STATS: readonly Stat[] = [
  { value: '50K+', label: 'Membres' },
  { value: '100+', label: 'Événements' },
  { value: '16', label: 'Régions' },
] as const;

// ============================================
// COMPONENT
// ============================================

export const Hero: FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-secondary/3" />
      </div>

      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="flex -space-x-2">
              {SUPPORTERS.map((supporter, i) => (
                <motion.div
                  key={supporter.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="ring-2 ring-background rounded-full"
                >
                  <UserAvatar name={supporter.name} size="sm" />
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">+50K</span> membres
            </span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Campagne 2025</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
          >
            L&apos;avenir de la{' '}
            <span className="gradient-text">Côte d&apos;Ivoire</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Rejoignez le mouvement pour un changement durable. 
            Ensemble, construisons une nation plus forte.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              Rejoindre <ArrowRight size={16} />
            </Button>
            <Button variant="outline">
              Découvrir
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-8 md:gap-12 mb-12"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Photos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-end gap-4 md:gap-6"
          style={{ perspective: '1000px' }}
        >
          <HeroPhoto src="/doctor1.png" alt="Jean-François Kouassi" priority />
          <HeroPhoto src="/doctor2.png" alt="JFK en action" className="hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
};
