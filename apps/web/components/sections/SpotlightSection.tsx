'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import TweetCard from '@/components/mvpblocks/twittercard';
import Image from 'next/image';

export const SpotlightSection: FC = () => {
  const tweets = [
    {
      authorName: "Jean-François Kouassi",
      authorHandle: "JFKouassi2025",
      authorImage: "/doctor1.png",
      content: [
        "La Côte d'Ivoire ne se réforme pas, elle se transforme. 🇨🇮",
        "Notre vision est claire : l'innovation pour tous, la transparence pour chacun.",
        "#JFK2025 #Innovation #CotedIvoire"
      ],
      timestamp: "22 Déc, 2025"
    },
    {
      authorName: "Jean-François Kouassi",
      authorHandle: "JFKouassi2025",
      authorImage: "/doctor1.png",
      content: [
        "L'éducation n'est pas une dépense, c'est notre investissement le plus précieux. 📚",
        "Chaque enfant ivoirien mérite les outils du futur.",
        "#Education #Avenir #JFK"
      ],
      timestamp: "20 Déc, 2025",
      reply: {
        authorName: "Marie-Noëlle L.",
        authorHandle: "marianne_civ",
        authorImage: "https://i.pravatar.cc/150?u=a04258114e29026703b",
        content: "Une vision qui nous redonne espoir ! Enfin du concret.",
        timestamp: "21 Déc"
      }
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Spotlight</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider italic">Direct</span>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            >
              Paroles d&apos;une <br /> 
              <span className="text-primary italic font-black">Vision Partagée</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-balance"
            >
              Parce que le changement commence par le dialogue. Découvrez les messages qui forgent notre mouvement jour après jour.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
               <div className="flex -space-x-3 items-center">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                      <Image 
                        src={`https://i.pravatar.cc/100?u=tweet${i}`} 
                        alt="user"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <span className="ml-6 text-sm font-bold text-foreground">
                    +12K Retweets
                  </span>
               </div>
            </motion.div>
          </div>

          {/* Right: Tweet Cards */}
          <div className="flex-1 w-full max-w-xl relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="flex flex-col gap-6 scale-90 sm:scale-100">
               {tweets.map((tweet, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 30, rotate: i === 0 ? -2 : 1 }}
                   whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -1 : 0.5 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.2 }}
                   className="hover:rotate-0 transition-all duration-500 hover:scale-[1.02] group"
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
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
