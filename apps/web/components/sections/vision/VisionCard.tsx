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
        'group relative h-full flex flex-col p-6 md:p-8',
        'bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl',
        'hover:bg-primary/5 hover:border-primary/20 transition-all duration-300',
        'shadow-sm hover:shadow-lg hover:shadow-primary/5'
      )}
    >
      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Decorative Gradient Border Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500 rounded-b-2xl" />
      
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-lg -z-10" />
    </motion.div>
  );
};
