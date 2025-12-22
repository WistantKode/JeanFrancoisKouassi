'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

const PathStep: FC<{ step: typeof PATH_STEPS[0], index: number }> = ({ step, index }) => {
  const stepRef = useRef<HTMLDivElement>(null);
  
  // Vertical reveal as it enters viewport
  const { scrollYProgress: stepProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(stepProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100]);
  const opacity = useTransform(stepProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(stepProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div 
      ref={stepRef}
      style={{ y, opacity, scale }}
      className="relative flex-shrink-0 w-[85vw] md:w-[60vw] group"
    >
      {/* Step Number */}
      <div className="absolute -top-32 left-0">
        <span className="text-8xl md:text-[10rem] font-black text-foreground/5 dark:text-white/5 tracking-tighter transition-all duration-700 group-hover:text-primary/10">
          0{index + 1}
        </span>
      </div>

      {/* Main Card */}
      <div className="relative pt-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-6">
            <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-gradient-to-r text-white shadow-xl shadow-black/10", step.color)}>
              POINT D&apos;INFLEXION {step.year}
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <h3 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.85] group-hover:italic transition-all duration-700">
            {step.title}
          </h3>

          <p className="text-lg md:text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed text-balance font-medium">
            {step.desc}
          </p>

          <div className="flex gap-4 items-center">
            <motion.div 
               whileHover={{ scale: 1.1 }}
               className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-colors cursor-pointer"
            >
              <div className="w-1.5 h-1.5 bg-primary group-hover:bg-white rounded-full" />
            </motion.div>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40">Explorer la vision</span>
          </div>
        </div>
      </div>

      {/* Connecting Line Enhancement */}
      {index < PATH_STEPS.length - 1 && (
        <div className="absolute top-1/2 -right-20 md:-right-40 w-10 md:w-20 h-px bg-gradient-to-r from-primary/20 to-transparent" />
      )}
    </motion.div>
  );
};

export const SovereignPath: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Text Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.03] dark:opacity-[0.05]">
           <h2 className="text-[25vw] font-black tracking-tighter text-foreground whitespace-nowrap">MISSION 2025</h2>
        </div>

        <motion.div style={{ x: springX }} className="flex gap-32 md:gap-52 px-10 md:px-20">
          {PATH_STEPS.map((step, i) => (
            <PathStep key={i} step={step} index={i} />
          ))}
        </motion.div>

        {/* Scroll Progress Indicator (Bottom Right) */}
        <div className="absolute bottom-16 right-10 md:right-16 flex items-end gap-6">
           <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-primary/60 mb-3">Progression du Parcours</span>
              <div className="w-32 md:w-56 h-[2px] bg-border/20 rounded-full overflow-hidden">
                 <motion.div 
                    style={{ scaleX: scrollYProgress }} 
                    className="h-full bg-primary origin-left shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                 />
              </div>
           </div>
           <span className="text-3xl md:text-5xl font-black text-foreground/10 italic select-none">JFK2025</span>
        </div>
      </div>
    </div>
  );
};
