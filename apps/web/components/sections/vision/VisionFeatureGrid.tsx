'use client';

import { type FC, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LANDING_CONTENT } from '@/config/landing';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: readonly string[];
  index: number;
  className?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, details, index, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBg = useSpring(
    useMotionValue('radial-gradient(400px circle at 0px 0px, rgba(var(--primary-rgb), 0.08), transparent 80%)'),
    { stiffness: 500, damping: 50 }
  );

  useEffect(() => {
    if (isHovered) {
      spotlightBg.set(`radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(var(--primary-rgb), 0.12), transparent 80%)`);
    }
  }, [mouseX, mouseY, isHovered, spotlightBg]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-8 backdrop-blur-3xl transition-all duration-500 hover:border-primary/50",
        className
      )}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />
      
      {/* Decorative Gradient Orb */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/10" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon size={28} />
          </div>
          <motion.div 
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            className="rounded-full bg-primary/10 p-2 text-primary backdrop-blur-sm"
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        <div>
          <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mb-6 text-base leading-relaxed text-slate-400 group-hover:text-slate-300">
            {description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {details.map((detail, i) => (
            <span 
              key={i}
              className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-500 transition-colors group-hover:border-primary/20 group-hover:text-primary/70"
            >
              # {detail}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const VisionFeatureGrid: FC = () => {
  const { title, subtitle, pillars, badge } = LANDING_CONTENT.vision;
  
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      {/* Header */}
      <div className="mb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 max-w-4xl bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-xl leading-relaxed text-slate-400/80"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {/* Card 1: Large Featured */}
        <FeatureCard 
          {...pillars[0]} 
          index={0} 
          className="lg:col-span-1 lg:row-span-2 min-h-[450px] bg-gradient-to-br from-black/40 to-primary/5"
        />

        {/* Card 2: Wide */}
        <FeatureCard 
          {...pillars[1]} 
          index={1} 
          className="lg:col-span-2 min-h-[300px]"
        />

        {/* Card 3: Standard */}
        <FeatureCard 
          {...pillars[2]} 
          index={2} 
          className="lg:col-span-1 min-h-[300px]"
        />

        {/* Card 4: Standard */}
        <FeatureCard 
          {...pillars[3]} 
          index={3} 
          className="lg:col-span-1 min-h-[300px]"
        />
      </div>

      {/* Remaining Pillars as overflow row or dynamic section */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <FeatureCard {...pillars[4]} index={4} className="min-h-[300px]" />
          <FeatureCard {...pillars[5]} index={5} className="min-h-[300px]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
