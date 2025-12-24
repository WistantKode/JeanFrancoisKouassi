'use client';

import React, { useState, type FC, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher, LanguageSwitcher } from '@/components/shared';
import { cn } from '@/lib/utils';
import {Logo} from "@/components/sections/navbar/Logo";
import {DesktopLinks} from "@/components/sections/navbar/DesktopLinks";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { href: '#vision', label: 'Vision' },
  { href: '#programme', label: 'Programme' },
  { href: '#rejoindre', label: 'Rejoindre' },
  { href: '#dons', label: 'Dons' },
] as const;

export const MagneticLink: FC<{ link: NavLink }> = ({ link }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div style={{ x, y }}>
      <Link
        href={link.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative px-4 py-2 text-[13px] font-black uppercase tracking-[0.3em] text-black/70 dark:text-white [.is-scrolled_&]:text-white hover:text-primary transition-colors group"
      >
        <span className="relative z-10">{link.label}</span>
        <motion.span 
          className="absolute inset-0 bg-primary/5 rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId="nav-bg"
        />
      </Link>
    </motion.div>
  );
};

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => setScrolled(latest > 50));
  }, [scrollY]);

  return (
    <div className="fixed top-0 inset-x-0 z-[100] transition-all duration-500 py-6 px-6">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className={cn(
          "relative flex items-center justify-between px-8 py-4 transition-all duration-700",
          "rounded-[2rem] border",
          scrolled 
            ? "is-scrolled bg-black/40 backdrop-blur-2xl shadow-2xl py-3 border-white/10"
            : "bg-transparent border-transparent"
        )}>
          {/* Logo */}
          <div className="text-black dark:text-white [.is-scrolled_&]:text-white transition-colors">
            <Logo/>
          </div>

          {/* Desktop Links */}
          <DesktopLinks/>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity text-black dark:text-white [.is-scrolled_&]:text-white">
               <LanguageSwitcher />
               <ThemeSwitcher />
            </div>
            
            <Button className="h-11 px-8 rounded-full bg-primary hover:bg-primary/90 text-[10px] font-black tracking-widest uppercase shadow-xl shadow-primary/20 group overflow-hidden text-white">
               <span className="relative z-10 flex items-center gap-2">
                 Rejoindre <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </span>
               <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[0.6s] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 [.is-scrolled_&]:bg-white/10 border border-black/10 dark:border-white/10 [.is-scrolled_&]:border-white/10 flex items-center justify-center text-primary group active:scale-90 transition-all"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[-1] bg-white/90 dark:bg-black/80 flex items-center justify-center p-8 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black/40 dark:text-white/40 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
