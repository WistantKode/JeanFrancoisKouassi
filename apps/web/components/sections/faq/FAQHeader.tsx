import {motion} from "framer-motion";
import {LANDING_CONTENT} from "@/lib/home/landing";

const { badge, title, subtitle} = LANDING_CONTENT.faq;

export const FAQHeader = () => {
    return (
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

    );
};
