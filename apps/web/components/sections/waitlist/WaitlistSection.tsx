'use client';

import { type FC, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '@/components/ui/particles';
import { Spotlight } from '@/components/ui/spotlight';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LANDING_CONTENT } from '@/config/landing';

export const WaitlistSection: FC = () => {
  const { resolvedTheme } = useTheme();
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
    <section className="relative min-h-[80vh] w-full overflow-hidden py-32 flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* We keep a subtle version or remove entirely. 
            The user said I forgot to delete parts. I'll remove them. */}
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border/50 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles size={14} className="text-secondary" />
            {badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 tracking-tight"
        >
           {title.main}{' '}
           <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent opacity-90">
             {title.highlight}
           </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center max-w-2xl mb-12 text-balance leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
               <motion.form
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.3 }}
                 onSubmit={handleSubmit}
                 className="flex flex-col sm:flex-row gap-3"
               >
                 <Input 
                    type="email" 
                    placeholder="votre@email.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background/50 backdrop-blur border-border/50 focus:border-primary/50 transition-colors"
                 />
                 <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    disabled={isSubmitting}
                 >
                    {isSubmitting ? (
                      <span className="animate-pulse">Envoi...</span>
                    ) : (
                      <span className="flex items-center gap-2">Rejoindre <ArrowRight size={16} /></span>
                    )}
                 </Button>
               </motion.form>
            ) : (
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center backdrop-blur-md"
               >
                 <Sparkles className="mx-auto text-primary mb-3 h-8 w-8" />
                 <h3 className="text-xl font-bold text-foreground mb-1">Merci de votre inscription !</h3>
                 <p className="text-muted-foreground text-sm">Nous vous contacterons très bientôt.</p>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Proof */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="mt-12 flex items-center justify-center gap-3"
        >
           <div className="flex -space-x-3">
             {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted">
                   <Image 
                      src={`https://i.pravatar.cc/100?u=jfk${i}`} 
                      alt={`Supporter ${i}`}
                      fill
                      className="object-cover"
                   />
                </div>
             ))}
           </div>
           <p className="text-sm text-muted-foreground">
             <span className="font-bold text-foreground">{stats.count}</span> {stats.label}
           </p>
        </motion.div>
      </div>
    </section>
  );
};
