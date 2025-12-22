import { Hero, Vision, FAQSection, CTASection, Waitlist } from '@/components/sections';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Vision />
      <FAQSection />
      <CTASection />
      <Waitlist />
    </main>
  );
}
