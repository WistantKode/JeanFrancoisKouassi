import {AnimatePresence, motion} from "framer-motion";
import {Menu, X} from "lucide-react";
import React, {useState} from "react";

export const MobileToggle = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group active:scale-90 transition-all"
            >
                <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                        <motion.div key="x" initial={{rotate: -90, opacity: 0}} animate={{rotate: 0, opacity: 1}}
                                    exit={{rotate: 90, opacity: 0}} transition={{duration: 0.3}}>
                            <X size={20}/>
                        </motion.div>
                    ) : (
                        <motion.div key="menu" initial={{rotate: 90, opacity: 0}} animate={{rotate: 0, opacity: 1}}
                                    exit={{rotate: -90, opacity: 0}} transition={{duration: 0.3}}>
                            <Menu size={20}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
};
