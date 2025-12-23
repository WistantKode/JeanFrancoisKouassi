import type { Metadata } from 'next';
import { Outfit, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { PageBackground } from '@/components/shared';
import React from "react";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: "Jean-François Kouassi (JFK) - Une Côte d'Ivoire unie et innovante",
    template: '%s | JFK Campagne',
  },
  description:
    "Plateforme officielle de campagne de Jean-François Kouassi. Ensemble pour la santé, l'innovation et l'unité nationale.",
  keywords: [
    'JFK',
    'Jean-François Kouassi',
    "Côte d'Ivoire",
    'Politique',
    'Santé',
    'Innovation',
    'Unité',
  ],
  authors: [{ name: 'JFK Campaign Team' }],
  creator: 'JFK Campaign Team',
  publisher: 'JFK Campaign',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    url: '/',
    siteName: 'JFK Campagne',
    title: "Jean-François Kouassi (JFK) - Une Côte d'Ivoire unie et innovante",
    description:
      "Rejoignez le mouvement pour une Côte d'Ivoire unie et innovante avec Jean-François Kouassi.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jean-François Kouassi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jean-François Kouassi (JFK) - Une Côte d'Ivoire unie et innovante",
    description:
      "Rejoignez le mouvement pour une Côte d'Ivoire unie et innovante.",
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <PageBackground>
            <main className="relative overflow-hidden">{children}</main>
          </PageBackground>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
