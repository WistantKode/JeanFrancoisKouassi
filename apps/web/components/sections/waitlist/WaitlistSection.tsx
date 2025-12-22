'use client';

import { type FC, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LANDING_CONTENT } from '@/config/landing';

export const WaitlistSection: FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
  };

  const { title, subtitle, stats, badge } = LANDING_CONTENT.waitlist;

  return (
    <section className="relative min-h-[80vh] w-full py-32 flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.9, y: -20 }}
           viewport={{ once: false }}
           transition={{ duration: 0.6 }}
           className="mb-10"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.6em] backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" />
            {badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-8 tracking-tighter leading-[0.9] uppercase"
        >
           {title.main} <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-600 italic">
             {title.highlight}
           </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground/60 text-center max-w-2xl mb-16 text-balance leading-relaxed uppercase tracking-[0.2em] font-bold"
        >
          {subtitle}
        </motion.p>

        {/* Form */}
        <div className="w-full max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
               <motion.form
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: -20 }}
                 transition={{ duration: 0.5, ease: "easeOut" }}
                 onSubmit={handleSubmit}
                 className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
               >
                 <Input 
                    type="email" 
                    placeholder="votre@email.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-transparent border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/30 font-medium px-6"
                 />
                 <Button 
                    type="submit" 
                    size="lg" 
                    className="relative group/btn h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105"
                    disabled={isSubmitting}
                 >
                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                    {isSubmitting ? (
                      <span className="animate-pulse">Traitement...</span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-3">Rejoindre <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" /></span>
                    )}
                 </Button>
               </motion.form>
            ) : (
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-10 rounded-3xl bg-primary/10 border border-primary/20 text-center backdrop-blur-2xl shadow-2xl shadow-primary/5"
               >
                 <Sparkles className="mx-auto text-primary mb-6 h-12 w-12 animate-bounce" />
                 <h3 className="text-3xl font-black text-foreground mb-3 uppercase tracking-tighter">Bienvenue dans le Mouvement !</h3>
                 <p className="text-muted-foreground/60 text-lg font-medium leading-relaxed">Votre voix compte. Nous bâtissons ensemble l&apos;avenir de la Côte d&apos;Ivoire.</p>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Proof */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           viewport={{ once: false }}
           transition={{ delay: 0.5 }}
           className="mt-16 flex flex-col items-center gap-6"
        >
           <div className="flex -space-x-4">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative w-12 h-12 rounded-full border-4 border-background overflow-hidden bg-muted transition-transform hover:scale-110 hover:z-20 cursor-pointer shadow-lg">
                   <Image 
                      src={`https://i.pravatar.cc/150?u=jfk_support_${i}`} 
                      alt={`Supporter ${i}`}
                      fill
                      className="object-cover"
                      unoptimized
                   />
                </div>
             ))}
           </div>
           <p className="text-sm md:text-base text-muted-foreground/50 font-black uppercase tracking-[0.3em] flex items-center gap-4">
             <span className="h-px w-8 bg-primary/30" />
             <span className="text-foreground">{stats.count}</span> {stats.label}
             <span className="h-px w-8 bg-primary/30" />
           </p>
        </motion.div>
      </div>
    </section>
  );
};
