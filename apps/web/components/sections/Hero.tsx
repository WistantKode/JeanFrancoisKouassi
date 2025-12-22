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

          {/* Title with Bidirectional Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-12"
          >
            {title.prefix}<br /> 
            <span className="inline-block mt-4 text-4xl sm:text-5xl md:text-6xl text-foreground font-black italic relative w-fit mx-auto">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-white/80 to-green-600 bg-clip-text text-transparent opacity-95">
                 L&apos;Espoir d&apos;une Nation
              </span>
              <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: "100%" }}
                 viewport={{ once: false }}
                 transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-orange-500 via-white/40 to-green-600 rounded-full" 
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground/60 max-w-2xl mx-auto mb-12 leading-relaxed uppercase tracking-widest font-bold"
          >
            Le déclic d&apos;une émergence souveraine. Pour une Côte d&apos;Ivoire audacieuse, unie et tournée vers l&apos;excellence.
          </motion.p>

          {/* CTA with enhanced button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Button size="lg" className="relative group/btn h-16 px-10 rounded-full bg-primary overflow-hidden hover:scale-105 transition-all duration-500 shadow-2xl shadow-primary/30 text-base font-black tracking-widest uppercase">
              <span className="relative z-10 flex items-center gap-3">{cta.primary} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/40 transition-all duration-500 text-base font-bold tracking-widest uppercase">
              {cta.secondary}
            </Button>
          </motion.div>

          {/* Revolutionary Supporter Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center gap-8 mb-24"
          >
            <HeroAvatars />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-black tracking-[0.4em] uppercase text-primary/60">
                Mouvement National 2025
              </p>
              <div className="flex items-center gap-5 text-muted-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <span>50,000+ Engagés</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                <span>16 Districts Unis</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
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
