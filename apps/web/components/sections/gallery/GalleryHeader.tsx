import {motion} from "framer-motion";

export const GalleryHeader = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-64 items-end">
            <div className="space-y-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-5 px-6 py-2.5 rounded-full bg-primary/5 border border-primary/20"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] font-black text-primary uppercase tracking-[0.6em]">Vision & Authenticité</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.7] uppercase"
                >
                    L&apos;HÉRITAGE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/20 italic">EN ACTION</span>
                </motion.h2>
            </div>

            <div className="space-y-10 lg:pl-32 border-l border-primary/10">
                <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground/40 text-[10px] md:text-sm leading-relaxed uppercase tracking-[0.4em] font-medium max-w-sm"
                >
                    Une immersion exclusive dans le quotidien d&apos;un leader dévoué. Chaque image est un témoignage silencieux de notre marche vers la souveraineté.
                </motion.p>
                <div className="flex items-center gap-6">
                    <div className="h-px w-24 bg-primary/30" />
                    <span className="text-xs font-black text-primary uppercase tracking-widest italic opacity-60">Archive 001/2025</span>
                </div>
            </div>
        </div>
    );
};
