'use client';

import { type FC } from 'react';
import { VisionFeatureGrid } from './vision/VisionFeatureGrid';
import { motion } from 'framer-motion';

export const Vision: FC = () => {
  return (
    <section id="vision" className="relative pb-24 md:pb-32 overflow-hidden bg-black">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -ms-[300px] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/2 -me-[300px] h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section-container relative z-10"
      >
        <VisionFeatureGrid />
      </motion.div>

      {/* Central Vertical Connector Line - Ultra Subtle */}
      <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-48 w-px bg-primary/10 hidden md:block" />

      {/* Decorative vertical line (top marker) */}
      <div className="absolute left-1/2 top-0 h-32 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
    </section>
  );
};
