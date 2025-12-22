'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

const PATH_STEPS = [
  {
    title: "SOUVERAINETÉ",
    year: "2025",
    desc: "Réappropriation de nos ressources et de notre destin économique via une gouvernance transparente.",
    color: "from-orange-500 to-orange-600",
    side: "right"
  },
  {
    title: "INNOVATION",
    year: "2026",
    desc: "Digitalisation totale des services publics et création d'un hub technologique continental unique.",
    color: "from-white/20 to-white/10",
    side: "left"
  },
  {
    title: "PROSPÉRITÉ",
    year: "2027",
    desc: "Une agriculture transformée et durable, moteur d'une industrie nationale puissante et exportatrice.",
    color: "from-green-500 to-green-600",
    side: "right"
  },
  {
    title: "RAYONNEMENT",
    year: "2030",
    desc: "La Côte d'Ivoire s'affirme comme le phare culturel, éthique et diplomatique de toute l'Afrique.",
    color: "from-primary/80 to-primary",
    side: "left"
  }
];

const PathStep: FC<{ step: typeof PATH_STEPS[0], index: number }> = ({ step, index }) => {
  const isRight = step.side === "right";

  return (
    <div 
      className={cn(
        "relative w-full flex min-h-[40vh] md:min-h-[50vh] items-center",
        index === PATH_STEPS.length - 1 ? "mb-0" : "mb-48 md:mb-72", // Increased spacing between steps for "breathability"
        isRight ? "justify-end pr-4 md:pr-24" : "justify-start pl-4 md:pl-24"
      )}
    >
      {/* Background Year Watermark - Fixed Clipping with safer positioning */}
      <motion.div 
        initial={{ opacity: 0, x: isRight ? 40 : -40, filter: "blur(10px)" }}
        whileInView={{ opacity: 0.12, x: isRight ? -20 : 20, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: isRight ? 40 : -40, filter: "blur(10px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: false, margin: "-20% 0px" }}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-[18vw] font-black pointer-events-none select-none",
          isRight ? "right-[5%] md:right-[15%]" : "left-[5%] md:left-[15%]"
        )}
      >
        {step.year}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, margin: "-10% 0px" }}
        className={cn(
          "relative z-10 w-full md:w-[45%] flex flex-col gap-3 md:gap-4", // Tightened internal gaps
          isRight ? "items-end text-right" : "items-start text-left"
        )}
      >
        {/* Step Marker/Number */}
        <div className={cn(
           "flex items-center gap-4 mb-2",
           isRight ? "flex-row-reverse" : "flex-row"
        )}>
          <span className="text-4xl md:text-5xl font-black text-primary/20">0{index + 1}</span>
          <div className="h-px w-12 md:w-16 bg-primary/20" />
        </div>

        <div className={cn(
          "px-4 py-1 rounded-full text-[8px] font-black tracking-[0.4em] bg-gradient-to-r text-white inline-block shadow-lg",
          step.color
        )}>
          HORIZON {step.year}
        </div>

        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-balance">
          {step.title}
        </h3>

        <p className="text-xs md:text-base text-muted-foreground/60 max-w-sm leading-relaxed font-medium">
          {step.desc}
        </p>

        <motion.div 
          whileHover={{ x: isRight ? -5 : 5 }}
          className="flex items-center gap-4 cursor-pointer group pt-4"
        >
          {!isRight && <div className="w-6 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />}
          <span className="text-[8px] uppercase tracking-[0.5em] font-black text-primary/80 group-hover:text-primary transition-colors">Explorer l&apos;Impact</span>
          {isRight && <div className="w-6 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const SovereignPath: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  return (
    <section ref={containerRef} className="relative pt-48 pb-32 bg-transparent">
      {/* Central Vertical Connector Line - Ultra Subtle */}
      <div className="absolute left-1/2 -translate-x-1/2 top-96 bottom-64 w-px bg-border/10 hidden md:block" />
      
      {/* Animated Path on Central Line */}
      <motion.div 
        style={{ scaleY: pathLength }}
        className="absolute left-1/2 -translate-x-1/2 top-96 bottom-64 w-[2px] bg-gradient-to-b from-orange-500/40 via-primary/40 to-green-600/40 origin-top hidden md:block"
      />

      <div className="section-container relative z-10 px-6">
        {/* Header - Refined Typography */}
        <div className="flex flex-col items-center text-center mb-48 md:mb-64">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-10"
          >
            <span className="px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-black tracking-[0.6em] text-primary uppercase">
              La Trajectoire Souveraine
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            BÂTIR LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 italic">DÉCLIC</span> <br />
            DE L&apos;ÉMERGENCE
          </h2>
        </div>

        {/* Staggered Path Steps */}
        <div className="flex flex-col gap-0 max-w-7xl mx-auto">
          {PATH_STEPS.map((step, i) => (
            <PathStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* Extreme Floating Background Watermark */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none select-none">
         <span className="text-[15vw] font-black tracking-tighter rotate-90 origin-top-right">JFK 2025</span>
      </div>
    </section>
  );
};

