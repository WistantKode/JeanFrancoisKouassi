'use client';

import { type FC } from 'react';
import { VisionFeatureGrid } from './vision/VisionFeatureGrid';

export const Vision: FC = () => {
  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_70%)]" />

      <div className="section-container relative z-10">
        <VisionFeatureGrid />
      </div>
    </section>
  );
};
