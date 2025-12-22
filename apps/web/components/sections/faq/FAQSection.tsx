'use client';

import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LANDING_CONTENT } from '@/config/landing';

export const FAQSection: FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { badge, title, subtitle, items } = LANDING_CONTENT.faq;

  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-container relative z-10 px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{badge}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-balance"
          >
            {title}
          </motion.h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            {subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={handleValueChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {items.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                   "p-1 rounded-2xl border transition-all duration-300",
                   openItems.includes(faq.id)
                     ? 'bg-primary/10 border-primary/30 shadow-2xl shadow-primary/5 backdrop-blur-3xl'
                     : 'bg-white/[0.03] dark:bg-white/[0.01] border-white/10 hover:border-primary/30 hover:bg-primary/5 backdrop-blur-xl'
                )}
              >
                <AccordionItem
                  value={faq.id}
                  className="border-none px-5 py-1"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-left group">
                    <div className="flex items-start gap-4 pr-4">
                      <div className={cn(
                        "mt-0.5 p-1.5 rounded-lg transition-colors shrink-0",
                        openItems.includes(faq.id) ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        <HelpCircle size={16} />
                      </div>
                      <span className={cn(
                        "text-base font-semibold transition-colors",
                        openItems.includes(faq.id) ? "text-primary" : "text-foreground"
                      )}>
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6 text-muted-foreground leading-relaxed">
                    <AnimatePresence>
                       <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                       >
                        {faq.answer}
                       </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px] -z-10" />
      </div>
    </section>
  );
};
