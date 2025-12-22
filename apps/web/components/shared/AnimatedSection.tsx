'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type FC, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export const AnimatedSection: FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Expo ease out
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  );
};
