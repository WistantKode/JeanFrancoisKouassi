'use client';

import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FeatureFlipCardProps {
  title: string;
  subtitle?: string;
  description: string;
  features: string[] | readonly string[];
  className?: string;
}

export const FeatureFlipCard: FC<FeatureFlipCardProps> = ({
  title,
  subtitle,
  description,
  features,
  className,
}) => {
  return (
    <div className={cn("group w-full h-[320px] [perspective:1000px]", className)}>
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-background/80 to-muted/80 backdrop-blur-sm border border-border/50 p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-primary/5 transition-all [backface-visibility:hidden]">
          {subtitle && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              {subtitle}
            </span>
          )}
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          
          <div className="w-12 h-1 bg-gradient-to-r from-orange-400 via-white to-green-500 rounded-full mt-2 opacity-80" />
          
          <p className="sr-only">Hover to reveal details</p>
          <div className="absolute bottom-6 text-muted-foreground text-sm opacity-60 flex items-center gap-2">
            Voir détails <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 border border-primary/20 p-6 text-primary-foreground [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div>
             <h3 className="text-xl font-bold mb-4">{title}</h3>
             <p className="text-sm text-primary-foreground/90 leading-relaxed mb-6">
               {description}
             </p>
             <ul className="space-y-2">
               {features.map((feature, i) => (
                 <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                   <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                   <span>{feature}</span>
                 </li>
               ))}
             </ul>
          </div>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-0"
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
};
