'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroPhotoProps {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function HeroPhoto({ src, alt, priority = false, className }: HeroPhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'relative w-40 h-52 md:w-48 md:h-64 lg:w-56 lg:h-72',
        'rounded-2xl overflow-hidden',
        'bg-muted border border-border',
        'shadow-lg shadow-black/5',
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">{alt}</span>
        </div>
      )}
      
      {/* Subtle gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );
}
