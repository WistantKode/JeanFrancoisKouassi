'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VisionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const VisionCard: FC<VisionCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative h-full flex flex-col p-6 md:p-8 rounded-3xl',
        // No borders, just background and subtle shadow
        'bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md',
        'shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]', // Very subtle default shadow
        'hover:shadow-[0_8px_30px_-4px_rgba(var(--primary),0.1)]', // Colored soft shadow on hover
        'transition-all duration-300'
      )}
    >
      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
        <Icon size={28} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-foreground/90">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {description}
      </p>

      {/* Hover Light Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};
