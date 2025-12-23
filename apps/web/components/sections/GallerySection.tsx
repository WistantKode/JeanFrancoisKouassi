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
  { src: "/IMG_8381.JPG", title: "Dialogue Social", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.15 },
  { src: "/IMG_8383.JPG", title: "Terrain & Réalités", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.05 },
  { src: "/IMG_8384.JPG", title: "L'Engagement", span: "lg:col-span-1 lg:row-span-2 col-span-1 row-span-2", speed: 0.2 },
  { src: "/IMG_8387.JPG", title: "Union Sacrée", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.08 },
  { src: "/IMG_8388.JPG", title: "Vers la Prospérité", span: "lg:col-span-2 lg:row-span-1 col-span-2 row-span-1", speed: 0.12 },
  { src: "/doctor2.png", title: "La Vision 2025", span: "lg:col-span-2 lg:row-span-2 col-span-2 row-span-2", speed: 0.1 },
  { src: "/IMG_8389.JPG", title: "Écoute Active", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.18 },
  { src: "/IMG_8390.JPG", title: "Soutien Populaire", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.05 },
  { src: "/IMG_8391.JPG", title: "Force du Collectif", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.15 },
  { src: "/IMG_8392.JPG", title: "Leadership Éclairé", span: "lg:col-span-1 lg:row-span-1 col-span-1 row-span-1", speed: 0.1 },
  { src: "/IMG_8493.JPG", title: "Authenticité", span: "lg:col-span-2 lg:row-span-1 col-span-2 row-span-1", speed: 0.08 },
];

const GridItem: FC<{ item: GalleryItem; index: number; progress: any }> = ({ item, index, progress }) => {
  const y = useTransform(progress, [0, 1], [0, -200 * item.speed]);
  const rotate = useTransform(progress, [0, 1], [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ y: smoothY, rotateZ: smoothRotate }}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        duration: 1.5, 
        delay: (index % 3) * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(
        "relative group overflow-hidden bg-muted/5 border border-white/5 hover:border-primary/40 transition-all duration-700",
        "rounded-[2.5rem] cursor-pointer",
        item.span
      )}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="object-cover transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:brightness-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
      />
      
      {/* Editorial Label Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-6">
        <div className="space-y-2">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/90">Collection {2025 + index % 2}</span>
           <h4 className="text-xl font-bold text-white tracking-tighter uppercase">{item.title}</h4>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 group-hover:ring-primary/20 transition-all duration-500 rounded-[2.5rem]" />
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
    <section ref={sectionRef} className="relative py-32 md:py-64 bg-transparent overflow-hidden">
      <div className="section-container px-6">
        {/* Editorial Header - Aligned with Hero round 2 */}
        <div className="flex flex-col items-center text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-2 mb-8"
          >
            <span className="font-instrument italic text-xl md:text-2xl text-primary/80 lowercase tracking-tight">
              vision & authenticité
            </span>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-outfit tracking-tighter leading-[0.8] flex flex-col items-center uppercase">
              <span className="font-black">L&apos;Héritage</span>
              <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-primary to-white italic">En Action</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground/40 text-[10px] md:text-xs max-w-xl leading-relaxed uppercase tracking-[0.4em] font-medium"
          >
            Une immersion exclusive dans le quotidien d&apos;un leader dévoué. Chaque image est un témoignage silencieux de notre marche vers la souveraineté.
          </motion.p>
        </div>

        {/* Parallax Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[400px] gap-4 md:gap-8">
          {LOCAL_IMAGES.map((item, i) => (
            <GridItem key={i} item={item} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Extreme Floating Background Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 opacity-[0.02] select-none">
         <span className="text-[40vw] font-black tracking-tighter uppercase whitespace-nowrap">JFK LEGACY</span>
      </div>
    </section>
  );
};
