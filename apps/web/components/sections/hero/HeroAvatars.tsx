'use client';

import { type FC } from 'react';
import { AvatarTooltip } from '@/components/shared/ui-blocks/avatar-tooltip';
import { LANDING_CONTENT } from '@/config/landing';

export const HeroAvatars: FC = () => {
  const { avatars } = LANDING_CONTENT.hero;

  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <div className="flex items-center justify-center w-full"> 
         {/* Wrapper to center properly as AvatarTooltip handles layout differently possibly */}
         <AvatarTooltip items={avatars} />
      </div>
      <span className="text-sm font-medium text-muted-foreground ml-4 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30">
        <span className="text-foreground font-bold">+50K</span> rejoignent l&apos;élan
      </span>
    </div>
  );
};
