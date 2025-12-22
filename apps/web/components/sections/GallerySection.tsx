'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(
        "relative group overflow-hidden bg-muted/5 border border-white/5 hover:border-primary/30 transition-all duration-1000",
        "rounded-[2.5rem]",
        item.span
      )}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:brightness-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
      />
      
      {/* Editorial Label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
             <div className="h-px w-8 bg-primary/60" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/80">Premium Archive</span>
          </div>
          <h4 className="text-2xl font-bold text-white tracking-tight leading-none italic">{item.title}</h4>
        </motion.div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
};

export const GallerySection: FC = () => {
  return (
    <section className="relative py-32 md:py-64 bg-transparent overflow-hidden">
      <div className="section-container px-6">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-end">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-primary/5 border border-primary/20"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Collections Éditoriales</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.75]"
            >
              CHRONIQUES <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/40 italic">DE L&apos;IMPACT</span>
            </motion.h2>
          </div>
          
          <div className="space-y-8 lg:pl-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground/50 text-sm md:text-base leading-relaxed uppercase tracking-[0.2em] font-medium border-l border-primary/20 pl-8"
            >
              Chaque cliché raconte une histoire de dévouement. Plongez dans les coulisses d&apos;une campagne bâtie sur l&apos;intégrité et la vision d&apos;une nation transformée.
            </motion.p>
            <div className="flex gap-4">
               <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent self-center" />
               <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest italic">Est. 2025</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[400px] gap-4 md:gap-8 overflow-hidden rounded-[3rem]">
          {LOCAL_IMAGES.map((item, i) => (
            <GridItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 opacity-[0.02] dark:opacity-[0.04]">
         <h2 className="text-[40vw] font-black whitespace-nowrap leading-none tracking-tighter select-none">
           GALLERIE PRESTIGE
         </h2>
      </div>
    </section>
  );
};

