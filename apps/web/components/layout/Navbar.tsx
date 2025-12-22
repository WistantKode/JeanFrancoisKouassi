'use client';

import { useState, type FC } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher, LanguageSwitcher } from '@/components/shared';
import { cn } from '@/lib/utils';

// ... existing code ...
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

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Smooth transform for width/padding
  const width = useTransform(scrollY, [0, 100], ['92%', '720px']);
  const y = useTransform(scrollY, [0, 100], [20, 10]);
  const elevatingShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 0 rgba(0,0,0,0)', '0 10px 30px -10px rgba(0,0,0,0.1)']
  );
  
  // Professional solid background with high blur for premium feel
  const backgroundColor = 'hsl(var(--background) / 0.6)';
  const borderColor = 'hsl(var(--primary) / 0.2)';
  const backdropBlur = 'blur(20px)';

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.header
        style={{ 
          width: '100%',
          maxWidth: width,
          y,
        }}
        className="pointer-events-auto"
      >
        <motion.nav
          style={{
            backdropFilter: backdropBlur,
            WebkitBackdropFilter: backdropBlur, // Safari support
            backgroundColor,
            borderColor,
            boxShadow: elevatingShadow,
          }}
          className={cn(
            'px-6 py-3 rounded-full border transition-all duration-500',
            'flex items-center justify-between',
            'shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]',
            'hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] hover:border-primary/40'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
             {/* Logo Icon Placeholder or Graphic could go here */}
            <span className="text-xl font-bold tracking-tight">
              <span className="text-primary group-hover:brightness-110 transition-all">JFK</span>
              <span className="text-secondary group-hover:brightness-110 transition-all">2025</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-muted-foreground/90 hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <div className="h-4 w-px bg-border/50" />
            <Button size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              Rejoindre
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/40 shadow-xl"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </motion.header>
    </div>
  );
};
