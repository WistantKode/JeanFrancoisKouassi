'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection: FC = () => {

  return (
    <div className="section-container px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary to-orange-600 p-8 sm:p-12 md:p-20 shadow-2xl shadow-primary/30 border border-white/10"
      >
        {/* Background Patterns model cta-2.tsx */}
        <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
          <div className="absolute top-1/2 right-[-20%] aspect-square h-[600px] w-[600px] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-pulse"></div>
            <div className="absolute inset-0 scale-[0.8] rounded-full bg-orange-300/20 delay-75"></div>
            <div className="absolute inset-0 scale-[0.6] rounded-full bg-white/10 opacity-30"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-bold text-white md:text-6xl tracking-tight"
          >
            Construisons l&apos;Avenir <br /> Ensemble.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-10 text-lg text-white/90 leading-relaxed text-balance"
          >
            Votre engagement est le moteur du changement. Rejoignez des milliers d&apos;Ivoiriens qui croient en une vision d&apos;innovation, de transparence et d&apos;unité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="h-14 px-8 rounded-full bg-white text-primary hover:bg-white/90 shadow-xl gap-2 font-bold transition-transform hover:scale-105">
              Devenir Bénévole <ArrowRight size={18} />
            </Button>
            <Button size="lg" className="h-14 px-8 rounded-full bg-black hover:bg-black/80 text-white gap-2 border-white/10 transition-transform hover:scale-105">
              Rejoindre le Discord <MessageSquare size={18} />
            </Button>
          </motion.div>
        </div>

        {/* Floating Icon Decor */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white md:flex hidden"
        >
            <Heart className="fill-white" size={32} />
        </motion.div>
      </motion.div>
    </div>
  );
};
