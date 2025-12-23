import {motion} from "framer-motion";
import {LANDING_CONTENT} from "@/lib/home/landing";


const {title, subtitle} = LANDING_CONTENT.hero;

export const HeroText = () => {
    return (
        <>
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                viewport={{once: false}}
                transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
                className="flex flex-col items-center gap-0 mb-8"
            >
            <span className="font-instrument italic text-2xl md:text-3xl text-primary/80 lowercase tracking-tight mb-2">
              {title.prefix}
            </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-outfit tracking-tighter leading-[0.9] flex flex-col items-center">
                    <span className="font-black uppercase">{title.highlight.split(" ")[0]}</span>
                    <span className="font-light -mt-1 opacity-90 relative">
                {title.highlight.split(" ").slice(1).join(" ")}
                        <motion.div
                            initial={{width: 0}}
                            whileInView={{width: "110%"}}
                            viewport={{once: false}}
                            transition={{delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1]}}
                            className="absolute -bottom-1 -left-[5%] h-1 bg-gradient-to-r from-orange-500 via-white/40 to-green-600 rounded-full"
                        />
              </span>
                </h1>
            </motion.div>

            <motion.p
                initial={{opacity: 0, y: 15}}
                whileInView={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -15}}
                viewport={{once: false}}
                transition={{duration: 0.8, delay: 0.1}}
                className="text-[10px] md:text-sm text-muted-foreground/50 max-w-lg mx-auto mb-8 leading-relaxed uppercase tracking-[0.4em] font-medium"
            >
              <span>
                  {subtitle}
              </span>
            </motion.p>
        </>
    );
};
