'use client';

import { useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Twitter,
  Facebook,
  Instagram,
  ArrowDownLeft,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const FOOTER_DATA = {
  navigation: {
    mouvement: [
      { name: 'Notre Vision', href: '#vision' },
      { name: 'Le Programme', href: '#programme' },
      { name: 'Événements', href: '#events' },
      { name: 'Actualités', href: '#news' },
    ],
    participer: [
      { name: 'Devenir Bénévole', href: '#rejoindre' },
      { name: 'Faire un Don', href: '#dons' },
      { name: 'Newsletter', href: '#waitlist' },
      { name: 'Boutique', href: '#' },
    ],
    ressources: [
      { name: 'Documentation', href: '#' },
      { name: 'Presse', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
  socialLinks: [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
  ],
};

export const Footer: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  if (!mounted) return null;

  return (
    <footer className="mt-20 w-full relative overflow-hidden bg-card/30 border-t border-border/50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
      
      <div className="relative w-full px-6">
        {/* Top Section */}
        <div className="section-container container m-auto grid grid-cols-1 gap-12 py-20 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="space-y-8 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
               <span className="text-3xl font-black tracking-tighter">
                <span className="text-primary group-hover:brightness-110 transition-all">JFK</span>
                <span className="text-secondary group-hover:brightness-110 transition-all">2025</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-balance">
              Pour une Côte d&apos;Ivoire unie, innovante et prospère. Ensemble, écrivons le prochain chapitre de notre grande nation.
            </p>
            
            <div className="flex items-center gap-3">
              {FOOTER_DATA.socialLinks.map(({ icon: Icon, label, href }) => (
                <Button
                  key={label}
                  size="icon"
                  variant="outline"
                  asChild
                  className="rounded-xl hover:bg-primary hover:text-white border-border/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-6"
                >
                  <Link href={href}>
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-sm space-y-4 pt-4"
            >
              <label htmlFor="email-footer" className="block text-sm font-semibold text-foreground italic">
                Abonnez-vous à notre lettre d&apos;information
              </label>
              <div className="relative group">
                <Input
                  type="email"
                  id="email-footer"
                  placeholder="Votre adresse email"
                  className="h-12 w-full rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all pl-4 pr-32"
                  required
                />
                <Button
                  type="submit"
                  className="absolute top-1.5 right-1.5 h-9 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
                >
                  S&apos;abonner
                </Button>
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="grid w-full grid-cols-2 items-start justify-between gap-12 lg:col-span-3">
            {(['mouvement', 'participer', 'ressources', 'legal'] as const).map(
              (section) => (
                <div key={section} className="w-full">
                  <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-foreground/50 border-l-2 border-primary/30 pl-4">
                    {section}
                  </h3>
                  <ul className="space-y-4">
                    {FOOTER_DATA.navigation[section].map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                        >
                          <ArrowDownLeft className="h-3 w-3 rotate-[225deg] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/30 w-full">
          <div className="section-container m-auto flex flex-col items-center justify-between gap-6 py-8 md:flex-row text-sm text-muted-foreground">
            <p className="font-medium">
              &copy; {currentYear} Jean-François Kouassi | Conçu pour la Côte d&apos;Ivoire
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
               <span className="flex items-center gap-2">
                <MapPin size={14} className="text-secondary" />
                Abidjan, CI
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                +225 07 00 00 00 00
              </span>
               <div className="h-4 w-px bg-border/50 hidden md:block" />
               <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Mentions</Link>
               </div>
            </div>
          </div>
        </div>
        
        {/* Glow Decor */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none -z-10" />
      </div>
    </footer>
  );
};
