'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LANDING_CONTENT } from '@/lib/landing';
import { LucideIcon } from 'lucide-react';

interface FeatureBlockProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: readonly string[];
  index: number;
}

const FeatureBlock: FC<FeatureBlockProps> = ({ icon: Icon, title, description, details, index }) => {
  const isRight = index % 2 !== 0;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full flex min-h-[40vh] items-center py-12 md:py-24",
        isRight ? "justify-end" : "justify-start"
      )}
    >
      {/* Background Watermark Number */}
      <motion.div
        style={{ y: smoothY }}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] pointer-events-none select-none font-outfit",
          isRight ? "right-[10%]" : "left-[10%]"
        )}
      >
        0{index + 1}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isRight ? 50 : -50, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative z-10 w-full md:w-[50%] flex flex-col gap-6",
          isRight ? "items-end text-right" : "items-start text-left"
        )}
      >
        {/* Icon with glow */}
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary backdrop-blur-md">
            <Icon size={32} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-4xl md:text-6xl font-outfit tracking-tighter leading-[0.9] uppercase flex flex-col">
            <span className="font-light italic text-primary/60 text-2xl md:text-3xl lowercase font-instrument mb-2">
              piliers de transformation
            </span>
            <span className="font-black">{title}</span>
          </h3>
          
          <p className="max-w-md text-base md:text-lg text-muted-foreground/50 leading-relaxed font-medium uppercase tracking-[0.2em]">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className={cn("flex flex-wrap gap-2 pt-4", isRight ? "justify-end" : "justify-start")}>
          {details.map((detail, i) => (
            <span 
              key={i}
              className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-black tracking-widest text-primary/70 uppercase"
            >
              {detail}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const VisionFeatureGrid: FC = () => {
  const { subtitle, pillars, badge } = LANDING_CONTENT.vision;
  
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      {/* Header - Aligned with Hero round 2 */}
      <div className="flex flex-col items-center text-center mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <span className="px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black tracking-[0.5em] text-primary uppercase">
            {badge}
          </span>
        </motion.div>

        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-outfit tracking-tighter leading-[0.8] flex flex-col items-center uppercase mb-12">
          <span className="font-black">Une Vision</span>
          <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600 italic">Audacieuse</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground/40 leading-relaxed uppercase tracking-[0.3em] font-bold"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Staggered Vertical Flow */}
      <div className="flex flex-col">
        {pillars.map((pillar, i) => (
          <FeatureBlock key={i} {...pillar} index={i} />
        ))}
      </div>
    </div>
  );
};
