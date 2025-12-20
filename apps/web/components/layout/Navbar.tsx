'use client';

import { useState, useEffect, type FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher, LanguageSwitcher } from '@/components/shared';
import { cn } from '@/lib/utils';

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

/**
 * Navbar that shrinks in WIDTH (left-right) when scrolling down.
 * Full width at top, becomes centered pill when scrolled.
 */
export const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-3 px-4"
    >
      <motion.nav
        animate={{
          maxWidth: isScrolled ? '720px' : '100%',
          margin: '0 auto',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'rounded-2xl border transition-all duration-400',
          'bg-background/80 backdrop-blur-xl border-border/50',
          isScrolled ? 'shadow-lg shadow-black/5' : ''
        )}
      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">
              <span className="text-primary">JFK</span>
              <span className="text-secondary">2025</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Button variant="ghost" size="sm">
              Connexion
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Rejoindre
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-3"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-2 pt-2 mt-2 border-t border-border/50">
              <Button variant="outline" size="sm" className="flex-1">
                Connexion
              </Button>
              <Button size="sm" className="flex-1 bg-primary">
                Rejoindre
              </Button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </motion.header>
  );
};
