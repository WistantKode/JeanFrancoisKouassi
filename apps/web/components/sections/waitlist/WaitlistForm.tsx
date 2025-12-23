import {AnimatePresence, motion} from "framer-motion";
import {Button, Input} from "@/components/ui";
import {ArrowRight, Sparkles} from "lucide-react";
import React, {useState} from "react";


export const WaitlistForm = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setEmail('');
    };


    return (
        <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                    >
                        <Input
                            type="email"
                            placeholder="votre@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 bg-transparent border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/30 font-medium px-6"
                        />
                        <Button
                            type="submit"
                            size="lg"
                            className="relative group/btn h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105"
                            disabled={isSubmitting}
                        >
                            <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-[0.8s] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                            {isSubmitting ? (
                                <span className="animate-pulse">Traitement...</span>
                            ) : (
                                <span className="relative z-10 flex items-center gap-3">Rejoindre <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" /></span>
                            )}
                        </Button>
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-10 rounded-3xl bg-primary/10 border border-primary/20 text-center backdrop-blur-2xl shadow-2xl shadow-primary/5"
                    >
                        <Sparkles className="mx-auto text-primary mb-6 h-12 w-12 animate-bounce" />
                        <h3 className="text-3xl font-black text-foreground mb-3 uppercase tracking-tighter">Bienvenue dans le Mouvement !</h3>
                        <p className="text-muted-foreground/60 text-lg font-medium leading-relaxed">Votre voix compte. Nous bâtissons ensemble l&apos;avenir de la Côte d&apos;Ivoire.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    );
};
