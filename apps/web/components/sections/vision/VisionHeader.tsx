'use client';

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/shared';

interface VisionHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
}

export const VisionHeader: FC<VisionHeaderProps> = ({
  title,
  subtitle,
  badge = 'Notre Vision',
  className,
}) => {
  return (
    <AnimatedSection className={cn('text-center max-w-3xl mx-auto mb-16 px-4', className)}>
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium text-primary uppercase tracking-wider">{badge}</span>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-lg text-muted-foreground text-balance leading-relaxed">
        {subtitle}
      </p>

      {/* Decorative separator */}
      <div className="relative h-1 w-24 mx-auto mt-8 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </AnimatedSection>
  );
};
