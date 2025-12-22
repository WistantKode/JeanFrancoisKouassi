'use client';

import { type FC } from 'react';
import CardFlip from '@/components/mvpblocks/card-flip';
import { type LucideIcon } from 'lucide-react';

export interface VisionFlipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[] | readonly string[];
}

export const VisionFlipCard: FC<VisionFlipCardProps> = ({
  icon: Icon,
  title,
  description,
  details = ['Impact Direct', 'Transformation', 'Avenir Durable']
}) => {
  return (
    <div className="h-full min-h-[300px] w-full">
      <div className="hidden"><Icon /></div>
      <CardFlip
        title={title}
        subtitle="Pilier Stratégique"
        description={description}
        features={details as string[]}
        // We might need to adapt CardFlip to accept Icon prop if possible, 
        // or we rely on its internal icons. For now, using as is per MVP block spec.
      />
    </div>
  );
};
