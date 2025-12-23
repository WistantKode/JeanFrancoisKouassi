'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface GalleryItem {
  src: string;
  title: string;
  span: string;
  speed: number;
}

const LOCAL_IMAGES: GalleryItem[] = [
  { src: "/doctor1.png", title: "L'Homme du Changement", span: "lg:col-span-2 lg:row-span-2 col-span-2 row-span-2", speed: 0.1 },
  { src: "/IMG_8381.JPG", title: "Dialogue Social", span: "lg:col-span-2 lg:row-span-2 col-span-2 row-span-2", speed: 0.15 },
  { src: "/IMG_8383.JPG", title: "Terrain & Réalités", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.05 },
  { src: "/IMG_8384.JPG", title: "L'Engagement", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.2 },
  { src: "/IMG_8387.JPG", title: "Union Sacrée", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.08 },
  { src: "/IMG_8388.JPG", title: "Vers la Prospérité", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.12 },
  { src: "/doctor2.png", title: "La Vision 2025", span: "lg:col-span-2 lg:row-span-2 col-span-2 row-span-2", speed: 0.1 },
  { src: "/IMG_8389.JPG", title: "Écoute Active", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.18 },
  { src: "/IMG_8390.JPG", title: "Soutien Populaire", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.05 },
  { src: "/IMG_8391.JPG", title: "Force du Collectif", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.15 },
  { src: "/IMG_8392.JPG", title: "Leadership Éclairé", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.1 },
  { src: "/IMG_8493.JPG", title: "Authenticité", span: "lg:col-span-2 lg:row-span-1 col-span-2 row-span-1", speed: 0.08 },
];

const GridItem: FC<{ item: GalleryItem; index: number; progress: any }> = ({ item, index, progress }) => {
  const y = useTransform(progress, [0, 1], [0, -250 * item.speed]);
  const rotate = useTransform(progress, [0, 1], [index % 2 === 0 ? -1.5 : 1.5, index % 2 === 0 ? 1.5 : -1.5]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ y: smoothY, rotateZ: smoothRotate }}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(30px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        duration: 2, 
        delay: (index % 4) * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(
        "relative group overflow-hidden bg-muted/5 border border-white/5 hover:border-primary/40 transition-all duration-1000",
        "rounded-[3rem] cursor-pointer",
        item.span
      )}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="object-cover transition-all duration-[3s] ease-out group-hover:scale-110 group-hover:brightness-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
      />
      
      {/* Editorial Label Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-end p-10">
        <div className="space-y-4">
           <div className="h-px w-12 bg-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/90">Archives Nationales</span>
           <h4 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">{item.title}</h4>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 group-hover:ring-primary/40 transition-all duration-700 rounded-[3rem]" />
    </motion.div>
  );
};

export const GallerySection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} className="relative py-48 md:py-80 bg-transparent overflow-hidden">
      <div className="section-container px-6">
        {/* Restored Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-64 items-end">
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-5 px-6 py-2.5 rounded-full bg-primary/5 border border-primary/20"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.6em]">Vision & Authenticité</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.7] uppercase"
            >
              L&apos;HÉRITAGE <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/20 italic">EN ACTION</span>
            </motion.h2>
          </div>
          
          <div className="space-y-10 lg:pl-32 border-l border-primary/10">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground/40 text-[10px] md:text-sm leading-relaxed uppercase tracking-[0.4em] font-medium max-w-sm"
            >
              Une immersion exclusive dans le quotidien d&apos;un leader dévoué. Chaque image est un témoignage silencieux de notre marche vers la souveraineté.
            </motion.p>
            <div className="flex items-center gap-6">
               <div className="h-px w-24 bg-primary/30" />
               <span className="text-xs font-black text-primary uppercase tracking-widest italic opacity-60">Archive 001/2025</span>
            </div>
          </div>
        </div>

        {/* Squarer & Larger Parallax Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[400px] md:auto-rows-[600px] gap-6 md:gap-12">
          {LOCAL_IMAGES.map((item, i) => (
            <GridItem key={i} item={item} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Floating Background Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 opacity-[0.015] select-none">
         <span className="text-[45vw] font-black tracking-tighter uppercase whitespace-nowrap">JFK LEGACY</span>
      </div>
    </section>
  );
};
