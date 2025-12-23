'use client'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@/lib/utils";
import {HelpCircle} from "lucide-react";
import {FC, useState} from "react";
import {LANDING_CONTENT} from "@/lib/home/landing";

const { items } = LANDING_CONTENT.faq;

export const FAQAccordion: FC = () => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const handleValueChange = (value: string[]) => {
        setOpenItems(value);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Accordion
                type="multiple"
                value={openItems}
                onValueChange={handleValueChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {items.map((faq, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            key={faq.id}
                            initial={{
                                opacity: 0,
                                x: isEven ? -50 : 50,
                                y: 20,
                                filter: "blur(10px)"
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                y: 0,
                                filter: "blur(0px)"
                            }}
                            exit={{
                                opacity: 0,
                                x: isEven ? -50 : 50,
                                y: -20,
                                filter: "blur(10px)"
                            }}
                            viewport={{ once: false, margin: "-10% 0px" }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
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
                    );
                })}
            </Accordion>
        </div>

    );
};
