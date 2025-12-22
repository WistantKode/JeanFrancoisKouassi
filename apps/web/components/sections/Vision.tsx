'use client';

import { type FC } from 'react';
import { VisionHeader } from '@/components/sections/vision';
import { FeatureFlipCard } from '@/components/shared/ui-blocks/feature-flip-card';
import { LANDING_CONTENT } from '@/config/landing';

export const Vision: FC = () => {
  const { title, subtitle, badge, pillars } = LANDING_CONTENT.vision;

  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] opacity-40" />

      <div className="section-container">
        {/* Header */}
        <VisionHeader
          title={title}
          subtitle={subtitle}
          badge={badge}
        />

        {/* Grid with Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {pillars.map((item) => (
            <FeatureFlipCard
              key={item.title}
              title={item.title}
              description={item.description}
              features={item.details}
              className="h-[350px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
