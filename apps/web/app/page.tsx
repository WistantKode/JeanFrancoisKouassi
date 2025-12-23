import {
    Hero,
    Vision,
    FAQSection,
    CTASection,
    Waitlist,
    SpotlightSection,
    GallerySection,
    SovereignPath
} from '@/components/sections';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Hero/>
            <SovereignPath/>
            <Vision/>
            <SpotlightSection/>
            <GallerySection/>
            <FAQSection/>
            <CTASection/>
            <Waitlist/>
        </main>
    );
}
