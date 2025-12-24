'use client';

import { type FC, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {LOCAL_IMAGES} from "@/lib/home/GalleryPhotosData";
import {GalleryHeader} from "@/components/sections/gallery/GalleryHeader";

interface GalleryItem {
    src: string;
    title: string;
    span: string;
    speed: number;
}

/**
 * Élément individuel de la grille de galerie.
 * 
 * Applique des transformations liées au scroll (parallaxe) :
 * - Translation verticale (y) basée sur la vitesse définie dans l'item.
 * - Rotation légère (rotateZ) alternée selon l'index pair/impair.
 * 
 * Gère aussi l'effet de survol (zoom image + overlay texte).
 */
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

/**
 * Section Galerie photo immersive.
 * 
 * Utilise une grille CSS asymétrique (Bento grid) combinée à des effets de parallaxe
 * pilotés par `framer-motion`. Chaque image défile à une vitesse différente pour créer
 * de la profondeur.
 */
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
          <GalleryHeader/>

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
