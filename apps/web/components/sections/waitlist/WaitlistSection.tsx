'use client';

import React, { type FC, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LANDING_CONTENT } from '@/lib/home/landing';
import {WaitlistBadge} from "@/components/sections/waitlist/WaitlistBadge";
import {WaitlistForm} from "@/components/sections/waitlist/WaitlistForm";
import {SocialProof} from "@/components/sections/waitlist/SocialProof";

export const WaitlistSection: FC = () => {
  const { title, subtitle} = LANDING_CONTENT.waitlist;

  return (
    <section className="relative min-h-[80vh] w-full py-32 flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Badge */}
          <WaitlistBadge/>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-8 tracking-tighter leading-[0.9] uppercase"
        >
           {title.main} <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-600 italic">
             {title.highlight}
           </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground/60 text-center max-w-2xl mb-16 text-balance leading-relaxed uppercase tracking-[0.2em] font-bold"
        >
          {subtitle}
        </motion.p>

        {/* Form */}
          <WaitlistForm/>
        {/* Social Proof */}
        <SocialProof/>
      </div>
    </section>
  );
};
