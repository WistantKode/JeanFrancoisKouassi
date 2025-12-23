import {HeroAvatars} from "@/components/sections/hero/HeroAvatars";
import {motion} from "framer-motion";

export const SupportersHub = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center gap-6 mb-16 opacity-80"
        >
            <HeroAvatars />

            <div className="flex flex-col gap-2">
                <p className="text-[9px] font-black tracking-[0.5em] uppercase text-primary/40">
                    Mouvement National 2025
                </p>
                <div className="flex items-center gap-4 text-muted-foreground/30 text-[8px] font-black uppercase tracking-[0.2em]">
                    <span>50,000+ Engagés</span>
                    <span className="w-1 h-1 rounded-full bg-primary/10" />
                    <span>16 Districts</span>
                    <span className="w-1 h-1 rounded-full bg-primary/10" />
                    <span>Impact Direct</span>
                </div>
            </div>
        </motion.div>
    );
};
