'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HeroPhoto } from '@/components/shared';
import { HeroAvatars } from '@/components/sections/hero/HeroAvatars';
import { LANDING_CONTENT } from '@/config/landing';

import { Particles } from '@/components/ui/particles';

export const Hero: FC = () => {
  const { title, cta } = LANDING_CONTENT.hero;
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-0 mb-8"
          >
            <span className="font-instrument italic text-2xl md:text-3xl text-primary/80 lowercase tracking-tight mb-2">
              {title.prefix}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-outfit tracking-tighter leading-[0.9] flex flex-col items-center">
              <span className="font-black uppercase">{title.highlight.split(" ")[0]}</span>
              <span className="font-light -mt-1 opacity-90 relative">
                {title.highlight.split(" ").slice(1).join(" ")}
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "110%" }}
                   viewport={{ once: false }}
                   transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                   className="absolute -bottom-1 -left-[5%] h-1 bg-gradient-to-r from-orange-500 via-white/40 to-green-600 rounded-full" 
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[10px] md:text-sm text-muted-foreground/50 max-w-lg mx-auto mb-8 leading-relaxed uppercase tracking-[0.4em] font-medium"
          >
            Le déclic d&apos;une émergence souveraine. Pour une Côte d&apos;Ivoire audacieuse, unie et tournée vers l&apos;excellence.
          </motion.p>

          {/* CTA with refined button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" className="relative group/btn h-14 px-8 rounded-full bg-primary overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl shadow-primary/20 text-sm font-black tracking-widest uppercase">
              <span className="relative z-10 flex items-center gap-3">{cta.primary} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 text-sm font-bold tracking-widest uppercase">
              {cta.secondary}
            </Button>
          </motion.div>

          {/* Supporter Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center gap-6 mb-16 opacity-80"
          >
            <HeroAvatars />
            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-black tracking-[0.5em] uppercase text-primary/40">
                Mouvement National 2025
              </p>
              <div className="flex items-center gap-4 text-muted-foreground/30 text-[8px] font-black uppercase tracking-[0.2em]">
                <span>50,000+ Engagés</span>
                <span className="w-1 h-1 rounded-full bg-primary/10" />
                <span>16 Districts</span>
                <span className="w-1 h-1 rounded-full bg-primary/10" />
                <span>Impact Direct</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Parallax Photos */}
        <div className="flex justify-center items-end gap-12 relative h-[500px] md:h-[600px]">
          <motion.div style={{ y: smoothY1 }} className="relative z-10">
            <HeroPhoto 
              src="/doctor1.png" 
              alt="Jean-François Kouassi" 
              priority 
              className="border-0 shadow-2xl shadow-primary/20 rounded-[3rem]"
            />
          </motion.div>
          <motion.div style={{ y: smoothY2 }} className="hidden md:block">
            <HeroPhoto 
              src="/doctor2.png" 
              alt="JFK en action" 
              priority
              className="border-0 shadow-2xl shadow-secondary/20 rounded-[3rem] opacity-70 scale-95" 
            />
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/30 font-black">Scrollez</span>
        <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="w-6 h-10 rounded-full border border-primary/20 flex justify-center p-1.5"
        >
           <motion.div 
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ duration: 1, repeat: Infinity }}
             className="w-2 h-2 bg-primary/60 rounded-full" 
           />
        </motion.div>
      </motion.div>
    </section>
  );
};
