'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  
  const isRight = step.side === "right";

  return (
    <div 
      ref={ref}
      className={cn(
        "relative w-full flex mb-32 md:mb-48",
        isRight ? "justify-end pr-4 md:pr-0" : "justify-start pl-4 md:pl-0"
      )}
    >
      {/* Background Year Watermark */}
      <motion.div 
        initial={{ opacity: 0, x: isRight ? 100 : -100 }}
        animate={isInView ? { opacity: 0.05, x: 0 } : {}}
        transition={{ duration: 1 }}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-[15vw] font-black pointer-events-none select-none",
          isRight ? "right-[10%]" : "left-[10%]"
        )}
      >
        {step.year}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: isRight ? 50 : -50, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(
          "relative z-10 w-full md:w-[45%] flex flex-col gap-6",
          isRight ? "items-end text-right" : "items-start text-left"
        )}
      >
        {/* Step Marker/Number */}
        <div className={cn(
           "flex items-center gap-4 mb-2",
           isRight ? "flex-row-reverse" : "flex-row"
        )}>
          <span className="text-4xl md:text-6xl font-black text-primary/20">0{index + 1}</span>
          <div className="h-px w-12 md:w-24 bg-primary/30" />
        </div>

        <div className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] bg-gradient-to-r text-white inline-block shadow-lg",
          step.color
        )}>
          HORIZON {step.year}
        </div>

        <h3 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-balance">
          {step.title}
        </h3>

        <p className="text-base md:text-xl text-muted-foreground/80 max-w-md leading-relaxed">
          {step.desc}
        </p>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 cursor-pointer group"
        >
          {!isRight && <div className="w-10 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />}
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Explorer la vision</span>
          {isRight && <div className="w-10 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />}
        </motion.div>
      </motion.div>

      {/* Connection SVG Path could go here, but a clean zigzag is already modern */}
    </div>
  );
};

export const SovereignPath: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative pt-32 pb-0 overflow-hidden bg-transparent">
      {/* Central Vertical Connector Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/20 hidden md:block" />
      
      {/* Animated Path on Central Line */}
      <motion.div 
        style={{ scaleY: pathLength }}
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-white to-green-600 origin-top hidden md:block"
      />

      <div className="section-container relative z-10 px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black tracking-[0.5em] text-primary uppercase">
              La Trajectoire du Future
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter">
            NOTRE <span className="text-secondary italic">CHEMIN</span> <br />
            VERS LA VICTOIRE
          </h2>
        </div>

        {/* Staggered Steps */}
        <div className="flex flex-col">
          {PATH_STEPS.map((step, i) => (
            <PathStep key={i} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* Spacing Fix: Reduced padding at bottom since Vision follows */}
      <div className="h-0" />
    </section>
  );
};
