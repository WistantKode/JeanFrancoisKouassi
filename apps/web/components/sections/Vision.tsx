'use client';

import { type FC } from 'react';
import { VisionFeatureGrid } from './vision/VisionFeatureGrid';

export const Vision: FC = () => {
  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        <VisionFeatureGrid />
      </div>
    </section>
  );
};
