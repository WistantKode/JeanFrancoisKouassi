'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface GalleryItem {
  src: string;
  title: string;
  span: string;
}

const LOCAL_IMAGES: GalleryItem[] = [
  { src: "/doctor1.png", title: "L'Homme du Changement", span: "lg:col-span-2 lg:row-span-2 col-span-2 row-span-2" },
  { src: "/IMG_8381.JPG", title: "Dialogue Social", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8383.JPG", title: "Terrain & Réalités", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8384.JPG", title: "L'Engagement", span: "lg:col-span-1 lg:row-span-2 col-span-1 row-span-2" },
  { src: "/IMG_8387.JPG", title: "Union Sacrée", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8388.JPG", title: "Vers la Prospérité", span: "lg:col-span-2 lg:row-span-1 col-span-2 row-span-1" },
  { src: "/doctor2.png", title: "La Vision 2025", span: "lg:col-span-2 lg:row-span-2 col-span-2 row-span-2" },
  { src: "/IMG_8389.JPG", title: "Écoute Active", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8390.JPG", title: "Soutien Populaire", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8391.JPG", title: "Force du Collectif", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8392.JPG", title: "Leadership Éclairé", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1" },
  { src: "/IMG_8493.JPG", title: "Authenticité", span: "lg:col-span-2 lg:row-span-1 col-span-2 row-span-1" },
];

const GridItem: FC<{ item: GalleryItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        delay: (index % 4) * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ y: -10, rotateZ: index % 2 === 0 ? 0.5 : -0.5 }}
      className={cn(
        "relative group overflow-hidden bg-muted/5 border border-white/5 hover:border-primary/40 transition-all duration-1000",
        "rounded-[2.5rem] cursor-pointer",
        item.span
      )}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="object-cover transition-all duration-[2s] ease-out group-hover:scale-110 group-hover:brightness-125"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
      />
      
      {/* Dynamic Light Sweep */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

      {/* Editorial Label with bidirectional shift */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-end p-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
             <div className="h-px w-12 bg-primary animate-width-expand" />
             <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary/90">Prestige Series</span>
          </div>
          <h4 className="text-3xl font-black text-white tracking-tighter leading-none italic uppercase">{item.title}</h4>
        </motion.div>
      </div>

      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 group-hover:ring-primary/30 transition-all duration-500 rounded-[2.5rem]" />
    </motion.div>
  );
};

export const GallerySection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xPos = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothX = useSpring(xPos, { stiffness: 50, damping: 20 });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-64 bg-transparent">
      <div className="section-container px-6">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40 items-end">
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              viewport={{ once: false }}
              className="inline-flex items-center gap-5 px-6 py-2.5 rounded-full bg-primary/5 border border-primary/20"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.6em]">Vision & Authenticité</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.7] uppercase"
            >
              L&apos;HÉRITAGE <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/20 italic">EN ACTION</span>
            </motion.h2>
          </div>
          
          <div className="space-y-10 lg:pl-32 border-l border-primary/10">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground/40 text-base md:text-lg leading-relaxed uppercase tracking-[0.3em] font-bold"
            >
              Une immersion exclusive dans le quotidien d&apos;un leader dévoué. Chaque image est un témoignage silencieux de notre marche vers la souveraineté.
            </motion.p>
            <div className="flex items-center gap-6">
               <div className="h-px w-24 bg-primary/30" />
               <span className="text-xs font-black text-primary uppercase tracking-widest italic opacity-60">Archive 001/2025</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[300px] md:auto-rows-[450px] gap-6 md:gap-10 rounded-[3.5rem]">
          {LOCAL_IMAGES.map((item, i) => (
            <GridItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Parallax Background Watermark */}
      <motion.div 
        style={{ x: smoothX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[200%] pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05]"
      >
         <h2 className="text-[45vw] font-black whitespace-nowrap leading-none tracking-tighter select-none uppercase">
           Prestige Collection 2025 Experience
         </h2>
      </motion.div>
    </section>
  );
};

