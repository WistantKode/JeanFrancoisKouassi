'use client';

import { type FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { Particles } from '@/components/ui/particles';
import { Spotlight } from '@/components/ui/spotlight';

interface PageBackgroundProps {
  children: ReactNode;
}

export const PageBackground: FC<PageBackgroundProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative min-h-screen w-full">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Spotlight effect follows scroll somewhat or is static? 
            Original Waitlist had one. Let's place a few for dynamic feel. */}
        <Spotlight 
          className="-top-40 left-0 md:left-60 md:-top-20" 
          fill={resolvedTheme === 'dark' ? 'rgba(0, 158, 96, 0.15)' : 'rgba(0, 158, 96, 0.1)'}
        />
        <Spotlight 
          className="top-[40%] right-0 md:right-20" 
          fill={resolvedTheme === 'dark' ? 'rgba(247, 127, 0, 0.1)' : 'rgba(247, 127, 0, 0.05)'}
        />
        
        <Particles
          className="absolute inset-0"
          quantity={150}
          staticity={30}
          color={resolvedTheme === 'dark' ? '#ffffff' : '#009e60'}
          refresh
        />

        {/* Noise Filter Background - like app-hero.tsx */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay">
          <svg className="h-full w-full">
             <filter id="global-noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
               <feColorMatrix type="saturate" values="0" />
             </filter>
             <rect width="100%" height="100%" filter="url(#global-noise)" />
          </svg>
        </div>

        {/* Global Gradients for "More Color" */}
        <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
