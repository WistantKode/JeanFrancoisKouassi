'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const GALLERY_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1540910419892-f39a62a15242?auto=format&fit=crop&q=80&w=800",
    title: "Yamoussoukro",
    size: "large",
    speed: 0.05
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    title: "Innovation Hub",
    size: "medium",
    speed: 0.1
  },
  {
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
    title: "Dialogue",
    size: "small",
    speed: 0.15
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    title: "Unité",
    size: "medium",
    speed: 0.08
  },
  {
    image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&q=80&w=800",
    title: "Avenir",
    size: "large",
    speed: 0.12
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    title: "Jeunesse",
    size: "small",
    speed: 0.07
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    title: "Vision 2025",
    size: "medium",
    speed: 0.1
  }
];

const FloatingImage: FC<{ item: typeof GALLERY_ITEMS[0], index: number }> = ({ item, index }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * item.speed * 10]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2]);

  const sizeClasses = {
    small: "w-32 h-48 md:w-48 md:h-64",
    medium: "w-48 h-64 md:w-64 md:h-[350px]",
    large: "w-56 h-[350px] md:w-[320px] md:h-[450px]"
  }[item.size as 'small' | 'medium' | 'large'];

  return (
    <motion.div
      ref={containerRef}
      style={{ y: smoothY, rotate }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={cn(
        "relative overflow-hidden group cursor-pointer transition-all duration-700",
        "bg-transparent border-0",
        sizeClasses
      )}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
        unoptimized
      />
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      
      <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white font-black mb-1">{item.title}</p>
        <div className="h-[2px] w-4 bg-primary group-hover:w-full transition-all duration-1000" />
      </div>
    </motion.div>
  );
};

export const GallerySection: FC = () => {
  return (
    <section className="relative py-32 md:py-64 overflow-visible bg-transparent">
      {/* Cinematic Header */}
      <div className="section-container mb-32 text-left relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Chroniques de l&apos;Espoir</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12"
        >
          LA FORCE <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-secondary opacity-90 italic">EN MOUVEMENT</span>
        </motion.h2>

        <p className="text-muted-foreground/60 text-sm max-w-xl leading-relaxed tracking-widest uppercase">
          Un voyage visuel à travers l&apos;élan d&apos;une nation. Pas de simples clichés, mais des fragments de notre futur commun.
        </p>
      </div>

      <div className="relative max-w-[1800px] mx-auto min-h-[120vh]">
        {/* Organic Layout Grid */}
        <div className="flex flex-wrap justify-center items-start gap-8 md:gap-16 px-4 md:px-20">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className={cn(
              "flex items-center justify-center",
              i % 3 === 0 ? "mt-0" : i % 3 === 1 ? "mt-24 md:mt-48" : "mt-12 md:mt-24"
            )}>
              <FloatingImage item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Decorative Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.03]">
           <h2 className="text-[20vw] font-black uppercase tracking-tighter">GALLERY</h2>
        </div>
      </div>

      {/* Extreme Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-gradient-to-t from-primary/10 to-transparent blur-[120px] -z-10" />
    </section>
  );
};
