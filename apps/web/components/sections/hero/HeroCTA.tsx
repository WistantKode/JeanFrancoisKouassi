import {Button} from "@/components/ui";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import {LANDING_CONTENT} from "@/lib/home/landing";

const { cta} = LANDING_CONTENT.hero;

export const HeroCTA = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
            <Button size="lg" className="relative group/btn h-14 px-8 rounded-full bg-primary overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl shadow-primary/20 text-sm font-black tracking-widest uppercase">
                <span className="relative z-10 flex items-center gap-3">{cta.primary} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 text-sm font-bold tracking-widest uppercase">
                {cta.secondary}
            </Button>
        </motion.div>
    );
};
