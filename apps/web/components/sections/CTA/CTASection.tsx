'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection: FC = () => {

  return (
    <div className="section-container px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden rounded-[3rem] bg-white/5 dark:bg-white/[0.02] backdrop-blur-2xl p-8 sm:p-12 md:p-20 shadow-2xl shadow-primary/5 border border-white/10"
      >
        {/* Background Patterns model CTA-2.tsx */}
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
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-black text-foreground dark:text-white md:text-7xl tracking-tighter uppercase leading-[0.9]"
          >
            Construisons l&apos;Avenir <br /> Ensemble.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="mb-10 text-lg md:text-2xl text-muted-foreground/60 dark:text-white/60 leading-relaxed text-balance uppercase tracking-widest font-bold"
          >
            Votre engagement est le moteur du changement. Rejoignez des milliers d&apos;Ivoiriens qui croient en une vision d&apos;innovation et d&apos;unité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button size="lg" className="relative group/btn h-16 px-10 rounded-full bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/10 gap-3 font-black transition-all hover:scale-105 overflow-hidden uppercase tracking-widest">
              <span className="relative z-10 flex items-center gap-2">Devenir Bénévole <ArrowRight size={20} /></span>
              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-full bg-black/40 hover:bg-black/60 text-white gap-3 border-white/10 transition-all hover:scale-105 uppercase tracking-widest font-bold">
              Communauté Discord <MessageSquare size={18} />
            </Button>
          </motion.div>
        </div>

        {/* Floating Icon Decor */}
        <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 p-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white md:flex hidden shadow-2xl shadow-white/5"
        >
            <Heart className="fill-white" size={40} />
        </motion.div>
      </motion.div>
    </div>
  );
};
