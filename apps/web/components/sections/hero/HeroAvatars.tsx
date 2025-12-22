'use client';

import { type FC } from 'react';
import InteractiveTooltip from '@/components/mvpblocks/interactive-tooltip';

const AVATAR_ITEMS = [
  {
    id: 1,
    name: 'Aminata K.',
    designation: 'Militante',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    id: 2,
    name: 'Kouamé B.',
    designation: 'Enseignant',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 3,
    name: 'Fatou D.',
    designation: 'Entrepreneur',
    image: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
  },
  {
    id: 4,
    name: 'Ibrahim S.',
    designation: 'Étudiant',
    image: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
];

export const HeroAvatars: FC = () => {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <InteractiveTooltip items={AVATAR_ITEMS} />
      <span className="text-sm font-medium text-muted-foreground ml-4 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30">
        <span className="text-foreground font-bold">+50K</span> rejoignent l'élan
      </span>
    </div>
  );
};
