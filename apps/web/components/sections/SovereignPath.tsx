'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const PATH_STEPS = [
  {
    title: "SOUVERAINETÉ",
    year: "2025",
    desc: "Réappropriation de nos ressources et de notre destin économique.",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "INNOVATION",
    year: "2026",
    desc: "Digitalisation totale des services publics et hub tech continental.",
    color: "from-white/20 to-white/10"
  },
  {
    title: "PROSPÉRITÉ",
    year: "2027",
    desc: "Une agriculture transformée, moteur d'une industrie puissante.",
    color: "from-green-500 to-green-600"
  },
  {
    title: "RAYONNEMENT",
    year: "2030",
    desc: "La Côte d'Ivoire comme phare culturel et éthique de l'Afrique.",
    color: "from-primary/80 to-primary"
  }
];

export const SovereignPath: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Maps vertical scroll to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Text Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-5">
           <h2 className="text-[30vw] font-black tracking-tighter text-foreground whitespace-nowrap">MISSION 2025</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-20 md:gap-40 px-20">
          {PATH_STEPS.map((step, i) => (
            <div key={i} className="relative flex-shrink-0 w-[80vw] md:w-[60vw] group">
              {/* Step Number */}
              <div className="absolute -top-32 left-0">
                <span className="text-8xl md:text-[12rem] font-black text-foreground/5 dark:text-white/5 tracking-tighter">
                  0{i + 1}
                </span>
              </div>

              {/* Main Card */}
              <div className="relative pt-10">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex items-center gap-6">
                    <span className={cn("px-4 py-1 rounded-full text-xs font-black tracking-widest bg-gradient-to-r text-white", step.color)}>
                      POINT D&apos;INFLEXION {step.year}
                    </span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>

                  <h3 className="text-6xl md:text-9xl font-black tracking-tighter group-hover:italic transition-all duration-700">
                    {step.title}
                  </h3>

                  <p className="text-xl md:text-3xl text-muted-foreground/80 max-w-2xl leading-relaxed text-balance">
                    {step.desc}
                  </p>

                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <div className="w-1.5 h-1.5 bg-primary group-hover:bg-white rounded-full" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground/60">Explorer la vision</span>
                  </div>
                </motion.div>
              </div>

              {/* Connecting Line Enhancement */}
              {i < PATH_STEPS.length - 1 && (
                <div className="absolute top-1/2 -right-20 md:-right-40 w-10 md:w-20 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress Indicator (Bottom Right) */}
        <div className="absolute bottom-20 right-20 flex items-end gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary mb-2">Progression</span>
              <div className="w-40 h-1 bg-border/20 rounded-full overflow-hidden">
                 <motion.div 
                    style={{ scaleX: scrollYProgress }} 
                    className="h-full bg-primary origin-left"
                 />
              </div>
           </div>
           <span className="text-4xl font-black text-foreground/20 italic">JFK2025</span>
        </div>
      </div>
    </div>
  );
};
