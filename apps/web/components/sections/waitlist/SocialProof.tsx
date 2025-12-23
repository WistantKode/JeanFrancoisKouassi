import Image from "next/image";
import {motion} from "framer-motion";
import React from "react";
import {LANDING_CONTENT} from "@/lib/home/landing";

const {stats} = LANDING_CONTENT.waitlist;

export const SocialProof = () => {
    return (
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
    );
};
