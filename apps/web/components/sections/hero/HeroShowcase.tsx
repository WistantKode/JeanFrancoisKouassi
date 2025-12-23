'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

export const HeroShowcase: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax and Perspective Transforms
  const yCenter = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const scaleCenter = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  
  const rotateLeft = useTransform(scrollYProgress, [0, 0.5], [-5, -15]);
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const yLeft = useTransform(scrollYProgress, [0, 0.5], [50, 100]);
  
  const rotateRight = useTransform(scrollYProgress, [0, 0.5], [5, 15]);
  const xRight = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const yRight = useTransform(scrollYProgress, [0, 0.5], [50, 100]);

  // Spring smoothing
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothYCenter = useSpring(yCenter, springConfig);
  const smoothScaleCenter = useSpring(scaleCenter, springConfig);
  
  const smoothRotateLeft = useSpring(rotateLeft, springConfig);
  const smoothXLeft = useSpring(xLeft, springConfig);
  const smoothYLeft = useSpring(yLeft, springConfig);
  
  const smoothRotateRight = useSpring(rotateRight, springConfig);
  const smoothXRight = useSpring(xRight, springConfig);
  const smoothYRight = useSpring(yRight, springConfig);

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[700px] flex items-center justify-center mt-20 md:mt-32 px-6 perspective-1000">
      
      {/* Left Card - Action 1 */}
      <motion.div 
        style={{ 
          rotateY: "25deg", 
          rotateZ: smoothRotateLeft,
          x: smoothXLeft, 
          y: smoothYLeft,
          z: -100
        }}
        className="absolute left-[10%] md:left-[15%] w-[250px] md:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 z-0 brightness-75 blur-[2px] transition-all duration-700 hover:brightness-100 hover:blur-0"
      >
        <Image 
          src="/action1.png" 
          alt="Action" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Right Card - Action 2 */}
      <motion.div 
        style={{ 
          rotateY: "-25deg", 
          rotateZ: smoothRotateRight,
          x: smoothXRight, 
          y: smoothYRight,
          z: -100
        }}
        className="absolute right-[10%] md:right-[15%] w-[250px] md:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 z-0 brightness-75 blur-[2px] transition-all duration-700 hover:brightness-100 hover:blur-0"
      >
        <Image 
          src="/action2.png" 
          alt="Action" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Center Card - Video / Dashboard Showcase */}
      <motion.div 
        style={{ 
          y: smoothYCenter, 
          scale: smoothScaleCenter,
          z: 100
        }}
        className="relative w-[320px] md:w-[800px] aspect-video rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,158,96,0.2)] z-10 group bg-black"
      >
        {/* Mock Video Placeholder */}
        <Image 
          src="/dashboard.png" 
          alt="Vision Video" 
          fill 
          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500">
           <motion.div 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl cursor-pointer ring-8 ring-white/10"
           >
             <Play fill="white" size={32} className="md:w-10 md:h-10 ml-2" />
           </motion.div>
        </div>

        {/* Video Bottom Label */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none">
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Documentaire</span>
              <span className="text-sm md:text-xl font-outfit font-black text-white uppercase tracking-tighter">Bâtir l&apos;Avenir ensemble</span>
           </div>
           <div className="px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <span className="text-[10px] font-black text-primary uppercase animate-pulse">Live</span>
           </div>
        </div>
      </motion.div>

    </div>
  );
};
