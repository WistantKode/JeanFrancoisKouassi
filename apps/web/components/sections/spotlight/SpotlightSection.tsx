'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import TweetCard from '@/components/mvpblocks/twittercard';
import Image from 'next/image';
import {TWEETS} from "@/lib/home/TweetsData";


export const SpotlightSection: FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothXLeft = useSpring(xLeft, { stiffness: 50, damping: 20 });
  const smoothXRight = useSpring(xRight, { stiffness: 50, damping: 20 });

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden bg-transparent">
      {/* Background Floating Wisdom Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               y: [0, -50, 0],
               x: [0, 30, 0],
               rotate: [0, 360, 0],
               scale: [1, 1.2, 1]
             }}
             transition={{ 
               duration: 10 + i * 2, 
               repeat: Infinity, 
               ease: "linear" 
             }}
             className="absolute text-[10vw] font-black pointer-events-none select-none"
             style={{ 
               top: `${20 * i}%`, 
               left: `${15 * i}%`,
               filter: "blur(20px)"
             }}
           >
             SAGE
           </motion.div>
         ))}
      </div>

      <div className="section-container relative z-10 px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              className="inline-flex items-center gap-4 mb-10"
            >
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Paroles d&apos;un Sage</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-outfit font-black mb-10 tracking-tighter leading-[0.8] uppercase"
            >
              ÉCOUTER <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-green-600 italic font-light font-instrument capitalize">L&apos;Essentiel</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-base md:text-xl text-muted-foreground/50 max-w-xl mx-auto lg:mx-0 mb-12 text-balance leading-relaxed uppercase tracking-widest font-bold"
            >
              Le changement commence par le dialogue et l&apos;écoute profonde du peuple.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex justify-center lg:justify-start"
            >
               <div className="flex -space-x-4 items-center scale-110">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="relative w-12 h-12 rounded-full border-2 border-background overflow-hidden ring-4 ring-primary/5">
                      <Image 
                        src={`https://i.pravatar.cc/100?u=tweet${i}`} 
                        alt="user"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                  <div className="ml-8 text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                    +12K Retweets
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Right: Tweet Cards with Parallax */}
          <div className="flex-1 w-full max-w-xl relative py-20">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="flex flex-col gap-12">
               {TWEETS.map((tweet, i) => (
                 <motion.div
                   key={i}
                   style={{ x: i === 0 ? smoothXLeft : smoothXRight }}
                   initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                   whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                   viewport={{ once: false, margin: "-50px" }}
                   transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative"
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10" />
                   <TweetCard {...tweet} />
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
