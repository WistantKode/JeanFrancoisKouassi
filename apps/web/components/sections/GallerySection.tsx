'use client';

import { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';

const GALLERY_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1540910419892-f39a62a15242?auto=format&fit=crop&q=80&w=800",
    title: "Meeting à Yamoussoukro",
    description: "Plus de 10 000 personnes réunies pour porter le message de changement."
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    title: "Hub Tech Regional",
    description: "Inauguration du centre d'innovation pour les startups ivoiriennes."
  },
  {
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
    title: "Dialogue Citoyen",
    description: "Une écoute active au cœur des régions pour comprendre chaque réalité."
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    title: "Unis pour la Nation",
    description: "Réunir toutes les forces vives de la nation autour d'un projet commun."
  },
  {
    image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&q=80&w=800",
    title: "Sommet de l'Avenir",
    description: "Définir les priorités stratégiques de la Côte d'Ivoire horizon 2030."
  }
];

const GalleryCard: FC<{ item: typeof GALLERY_ITEMS[0] }> = ({ item }) => {
  return (
    <div className="relative group w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] rounded-[2.5rem] overflow-hidden mx-4 cursor-pointer">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay - Glassmorphism description that appears on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      
      <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
          <p className="text-sm text-white/80 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      </div>
      
      {/* Always visible title badge (optional, for quality) */}
      <div className="absolute top-6 left-6 group-hover:opacity-0 transition-opacity">
        <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
          <span className="text-xs font-bold text-white uppercase tracking-widest">{item.title}</span>
        </div>
      </div>
    </div>
  );
};

export const GallerySection: FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      <div className="section-container mb-16 text-center">
        <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Moments Forts</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
        >
          L'Histoire en <br /> 
          <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Mouvement</span>
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s] py-10">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} />
          ))}
        </Marquee>
        
        {/* Gradient Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};
