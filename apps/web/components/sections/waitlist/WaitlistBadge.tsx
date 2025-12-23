import {Sparkles} from "lucide-react";
import {motion} from "framer-motion";
import React from "react";
import {LANDING_CONTENT} from "@/lib/home/landing";


const {badge} = LANDING_CONTENT.waitlist;

export const WaitlistBadge = () => {
    return (
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
    );
};
