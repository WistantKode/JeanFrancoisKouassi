'use client';

import { type FC } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroPhotoProps {
  /** Path to the image file */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Load image with priority */
  priority?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero photo component with 3D tilt effect on hover.
 * Uses Framer Motion for smooth spring-based animations.
 */
export const HeroPhoto: FC<HeroPhotoProps> = ({ 
  src, 
  alt, 
  priority = false, 
  className 
}) => {
  const x: MotionValue<number> = useMotionValue(0);
  const y: MotionValue<number> = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = (): void => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative cursor-pointer',
        'w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80',
        'overflow-hidden',
        'transition-shadow duration-300',
        'hover:shadow-2xl hover:shadow-primary/20',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
      />
      
      {/* Shine effect on hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ transform: 'translateZ(50px)' }}
      />
      
    </motion.div>
  );
};
