'use client';

import {FAQHeader} from "@/components/sections/faq/FAQHeader";
import {FAQAccordion} from "@/components/sections/faq/FAQAccordion";

export const FAQSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-container relative z-10 px-6">
        {/* Header */}
          <FAQHeader/>
        {/* FAQ Accordion */}
          <FAQAccordion/>
        {/* Decorative elements */}
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px] -z-10" />
      </div>
    </section>
  );
};
