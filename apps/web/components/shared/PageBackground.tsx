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

  // Premium colors for spotlights based on theme
  const primaryGlow = resolvedTheme === 'dark' 
    ? 'hsla(156, 100%, 50%, 0.15)'   // Green
    : 'hsla(156, 100%, 50%, 0.1)';
  const secondaryGlow = resolvedTheme === 'dark' 
    ? 'hsla(31, 100%, 50%, 0.15)'    // Orange
    : 'hsla(31, 100%, 50%, 0.05)';

  return (
    <div className="relative min-h-screen w-full">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* Mirror Spotlights handled by component internally */}
        <Spotlight 
          gradientFirst={`radial-gradient(68.54% 68.72% at 55.02% 31.46%, ${primaryGlow} 0%, transparent 80%)`}
          gradientSecond={`radial-gradient(50% 50% at 50% 50%, ${secondaryGlow} 0%, transparent 100%)`}
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
