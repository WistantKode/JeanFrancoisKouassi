import { Hero, Vision, FAQSection, CTASection, Waitlist, SpotlightSection, GallerySection } from '@/components/sections';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Vision />
      <SpotlightSection />
      <FAQSection />
      <GallerySection />
      <CTASection />
      <Waitlist />
    </main>
  );
}
