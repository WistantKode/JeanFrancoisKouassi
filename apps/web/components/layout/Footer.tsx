'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Vision', href: '#vision' },
    { label: 'Programme', href: '#programme' },
    { label: 'Rejoindre', href: '#rejoindre' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/legal' },
    { label: 'Politique de confidentialité', href: '/privacy' },
    { label: 'CGU', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-dark-50 border-t border-white/5">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold">
                <span className="text-primary">JFK</span>
                <span className="text-white/80">2025</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Ensemble, construisons l&apos;avenir de la Côte d&apos;Ivoire. 
              Rejoignez le mouvement pour un changement durable.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">
              Recevez les dernières actualités de la campagne.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-dark border-white/10"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Mail size={16} className="mr-2" />
                S&apos;abonner
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} JFK 2025. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              Abidjan, Côte d&apos;Ivoire
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} />
              +225 XX XX XX XX
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
