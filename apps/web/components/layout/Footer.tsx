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
    <footer className="mt-20 w-full relative overflow-hidden bg-transparent pt-10">
      {/* Energy Flow Animation Line */}
      <div className="animate-energy-flow via-primary h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      
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
            <p className="text-muted-foreground max-w-sm leading-relaxed text-balance text-base">
              Pour une Côte d&apos;Ivoire unie, innovante et prospère. Ensemble, écrivons le prochain chapitre de notre grande nation.
            </p>
            
            <div className="flex items-center gap-3">
              {FOOTER_DATA.socialLinks.map(({ icon: Icon, label, href }) => (
                <Button
                  key={label}
                  size="icon"
                  variant="outline"
                  asChild
                  className="size-11 rounded-xl bg-background/40 backdrop-blur-md border-primary/20 hover:bg-primary hover:text-white cursor-pointer transition-all duration-500 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Link href={href}>
                    <Icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-sm space-y-4 pt-4"
            >
              <label htmlFor="email-footer" className="block text-sm font-bold text-foreground">
                Rejoindre la newsletter <span className="text-primary italic">— JFK 2025</span>
              </label>
              <div className="relative group">
                <Input
                  type="email"
                  id="email-footer"
                  placeholder="votre@email.com"
                  className="h-12 w-full rounded-2xl bg-white/5 dark:bg-black/5 backdrop-blur-xl border-primary/20 focus:border-primary/50 transition-all pl-5 pr-32"
                  required
                />
                <Button
                  type="submit"
                  className="absolute top-1.5 right-1.5 h-9 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:px-8"
                >
                  S&apos;inscrire
                </Button>
              </div>
            </form>
            
            <h1 className="from-primary/10 via-secondary/10 to-transparent bg-gradient-to-b bg-clip-text text-5xl font-black text-transparent lg:text-8xl select-none">
              REPUBLIQUE
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="grid w-full grid-cols-2 items-start justify-between gap-12 lg:col-span-3">
            {(['mouvement', 'participer', 'ressources', 'legal'] as const).map(
              (section) => (
                <div key={section} className="w-full">
                  <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 border-l-2 border-secondary/40 pl-4">
                    {section}
                  </h3>
                  <ul className="space-y-4">
                    {FOOTER_DATA.navigation[section].map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground decoration-primary underline-offset-8 transition-all duration-500 hover:pl-4 hover:underline"
                        >
                          <ArrowDownLeft className="h-4 w-4 text-primary rotate-[225deg] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-125 transition-all duration-500" />
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

        {/* Rotate 3D Section Divider */}
        <div className="animate-rotate-3d via-secondary h-px w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40" />
        
        {/* Bottom Section */}
        <div className="text-muted-foreground/80 container m-auto flex flex-col items-center justify-between gap-6 py-10 md:flex-row text-[13px] font-medium">
          <p className="">
            &copy; {currentYear} <span className="text-foreground">Jean-François Kouassi</span> | <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent px-1">L&apos;union fait la force</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
             <span className="flex items-center gap-2 group cursor-default">
                <MapPin size={16} className="text-secondary group-hover:scale-110 transition-transform" />
                Abidjan, Côte d&apos;Ivoire
              </span>
              <span className="flex items-center gap-2 group cursor-default">
                <Phone size={16} className="text-primary group-hover:scale-110 transition-transform" />
                +225 27 00 00 00 00
              </span>
             <div className="h-4 w-px bg-border/40 hidden md:block" />
             <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Politique</Link>
             </div>
          </div>
        </div>
        
        {/* Colorful Glow Decor */}
        <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent pointer-events-none -z-10" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

    </footer>
  );
};
