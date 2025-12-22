'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LANDING_CONTENT } from '@/config/landing';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: readonly string[];
  index: number;
  position: 'left' | 'right';
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, index, position }) => {
  const isLeft = position === 'left';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className={cn(
        "relative p-8 rounded-[2rem] transition-all duration-500",
        "bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
        "flex flex-col gap-5 group-hover:-translate-y-1"
      )}>
        {/* Icon & Underline Effect */}
        <div className="relative w-fit">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <Icon size={24} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed text-balance">
            {description}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

export const VisionFeatureGrid: FC = () => {
  const { title, subtitle, pillars, badge } = LANDING_CONTENT.vision;
  
  // Split pillars into left and right
  const leftPillars = pillars.slice(0, 3);
  const rightPillars = pillars.slice(3, 6);

  return (
    <div className="mx-auto max-w-[1240px] px-6">
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-3 lg:items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {leftPillars.map((pillar, i) => (
            <FeatureCard 
              key={pillar.title} 
              {...pillar} 
              index={i} 
              position="left" 
            />
          ))}
        </div>

        {/* Center Column - Header */}
        <div className="text-center px-4 lg:-order-none order-first lg:mb-0 mb-8">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{badge}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
             className="text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground text-balance leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {rightPillars.map((pillar, i) => (
            <FeatureCard 
              key={pillar.title} 
              {...pillar} 
              index={i} 
              position="right" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
