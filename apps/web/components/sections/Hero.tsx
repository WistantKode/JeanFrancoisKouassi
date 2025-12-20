'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { UserAvatar, HeroPhoto } from '@/components/shared';

// Mock supporters data
const SUPPORTERS = [
  { name: 'Aminata K.', src: null },
  { name: 'Kouamé B.', src: null },
  { name: 'Fatou D.', src: null },
  { name: 'Ibrahim S.', src: null },
  { name: 'Marie-Anne T.', src: null },
];

const STATS = [
  { value: '50K+', label: 'Membres' },
  { value: '100+', label: 'Événements' },
  { value: '16', label: 'Régions' },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Campagne 2025</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            L&apos;avenir de la{' '}
            <span className="gradient-text">Côte d&apos;Ivoire</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 text-balance"
          >
            Rejoignez le mouvement pour un changement durable. 
            Ensemble, construisons une nation plus forte et plus juste.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
              Rejoindre le mouvement
              <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline">
              Découvrir la vision
            </Button>
          </motion.div>

          {/* Supporters Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="flex -space-x-2">
              {SUPPORTERS.map((supporter, i) => (
                <motion.div
                  key={supporter.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="ring-2 ring-background rounded-full"
                >
                  <UserAvatar name={supporter.name} src={supporter.src} size="sm" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+50 000</span> ont rejoint
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-8 md:gap-12"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Politician Photos Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex justify-center gap-4 md:gap-6"
        >
          <HeroPhoto alt="Jean-François Kouassi" priority />
          <HeroPhoto alt="Meeting populaire" className="hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
