'use client';

import { type FC } from 'react';
import { ArrowRight, HeartPulse, Lightbulb, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection, HeroPhoto } from '@/components/shared';
import { cn } from '@/lib/utils';

interface VisionItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: typeof HeartPulse;
  color: string;
}

const VISION_ITEMS: readonly VisionItem[] = [
  {
    title: 'Santé pour Tous',
    description:
      "Notre priorité absolue est de garantir l'accès aux soins de santé de qualité pour chaque Ivoirien. Nous modernisons les infrastructures et valorisons le personnel médical.",
    image: '/doctor1.png',
    alt: 'Médecin auscultant un patient',
    icon: HeartPulse,
    color: 'text-rose-500 bg-rose-500/10',
  },
  {
    title: 'Innovation & Tech',
    description:
      'La Côte d\'Ivoire doit devenir le hub technologique de l\'Afrique de l\'Ouest. Nous soutenons les startups et la digitalisation des services publics pour une administration efficace.',
    image: '/doctor2.png',
    alt: 'Jeunes travaillant sur ordinateur',
    icon: Lightbulb,
    color: 'text-amber-500 bg-amber-500/10',
  },
  {
    title: 'Unité Nationale',
    description:
      'La force de notre nation réside dans sa diversité. Nous promouvons le dialogue, la réconciliation et l\'égalité des chances pour bâtir une paix durable.',
    image: '/doctor1.png', // Placeholder, should be different
    alt: 'Groupe de personnes diversifiées',
    icon: Users,
    color: 'text-blue-500 bg-blue-500/10',
  },
] as const;

export const Vision: FC = () => {
  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Une Vision <span className="gradient-text">Audacieuse</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Nous ne proposons pas simplement des réformes, mais une transformation 
            profonde de notre société, basée sur des valeurs humaines et le progrès.
          </p>
        </AnimatedSection>

        {/* Zigzag Content */}
        <div className="space-y-24 md:space-y-32">
          {VISION_ITEMS.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;

            return (
              <div 
                key={item.title} 
                className={cn(
                  "flex flex-col md:flex-row items-center gap-12 md:gap-24",
                  !isEven && "md:flex-row-reverse"
                )}
              >
                {/* Image Side */}
                <AnimatedSection 
                  className="w-full md:w-1/2 flex justify-center" 
                  direction={isEven ? 'right' : 'left'}
                >
                  <div className="relative group">
                    <HeroPhoto 
                      src={item.image} 
                      alt={item.alt} 
                      className="w-full max-w-md aspect-[4/5] md:aspect-[3/4] h-auto"
                    />
                    
                    {/* Decorative Elements behind */}
                    <div className="absolute -inset-4 -z-10 border border-primary/20 rounded-[2rem] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                    <div className="absolute -z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[80px] rounded-full" />
                  </div>
                </AnimatedSection>

                {/* Text Side */}
                <AnimatedSection 
                  className="w-full md:w-1/2 space-y-6" 
                  direction={isEven ? 'left' : 'right'}
                  delay={0.2}
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", item.color)}>
                    <Icon size={28} />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  
                  <Button variant="ghost" className="group p-0 hover:bg-transparent hover:text-primary">
                    En savoir plus 
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </AnimatedSection>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
