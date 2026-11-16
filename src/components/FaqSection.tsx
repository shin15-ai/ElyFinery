import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BowDivider } from './Ornaments';
import { ScrollReveal } from './ScrollReveal';

type FaqCategory = 'All' | 'Sizing & Fit' | 'Orders & Shipping' | 'Atelier Care';

interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-sizing',
    category: 'Sizing & Fit',
    question: 'How do I choose the right dress size?',
    answer:
      'Every dress in our collection is tailored true to size across XS to L. Tap "Details" on any dress card and open the Size & Fit Guide to compare bust and waist measurements, or look for adjustable ribbon straps and bias-cut silhouettes if you prefer a more forgiving drape.',
  },
  {
    id: 'faq-shipping',
    category: 'Orders & Shipping',
    question: 'How much is shipping and when is it free?',
    answer:
      'Standard atelier delivery is ₱180 nationwide. Orders totaling ₱4,500 or more automatically unlock complimentary shipping—plus every order arrives wrapped in our keepsake satin ribbon packaging.',
  },
  {
    id: 'faq-payment',
    category: 'Orders & Shipping',
    question: 'Which payment methods do you accept?',
    answer:
      'You can complete your order using Card or Cash on Delivery (COD) right inside the Shopping Bag checkout drawer. You can also enter welcome code ELARION10 in your bag for 10% off your pieces.',
  },
  {
    id: 'faq-care',
    category: 'Atelier Care',
    question: 'How should I care for silk, chiffon, and pearl pieces?',
    answer:
      'For our mulberry silk gowns and chiffon bow dresses, we recommend specialist dry cleaning or gentle cold hand washing inside a mesh garment bag, then steaming on a low silk setting. Keep freshwater pearl jewelry away from perfume and store leather handbags upright in a dust pouch.',
  },
  {
    id: 'faq-custom',
    category: 'Sizing & Fit',
    question: 'Can I ask about length adjustments or ribbon colors?',
    answer:
      'Yes! Tap the Mail icon in our Contact Us footer or message us on Instagram (@elarionsfinery), and Trixie and Ericson will gladly help with styling guidance, measurements, or custom ribbon pairings.',
  },
];

const FAQ_CATEGORIES: FaqCategory[] = [
  'All',
  'Sizing & Fit',
  'Orders & Shipping',
  'Atelier Care',
];

export function FaqSection({ onOpenContact }: { onOpenContact: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('All');
  const [openId, setOpenId] = useState<string>('faq-sizing');

  const visibleFaqs =
    selectedCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="faq"
      className="relative overflow-hidden silk-band-cream py-16 sm:py-24 border-t border-white/60"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-8">
          <BowDivider className="mb-4 max-w-[380px]" />
          <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#6E4449]">
            Everything you need to know about sizing, shipping &amp; atelier care.
          </p>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal delay={0.05} className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Filter FAQ by topic"
            className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#F2D9D7]/70 rounded-xl border border-[#B68488]/20"
          >
            {FAQ_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedCategory(category);
                    const first =
                      category === 'All'
                        ? FAQ_ITEMS[0]
                        : FAQ_ITEMS.find((f) => f.category === category);
                    if (first) setOpenId(first.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FDF7F6] text-[#5D2B31] shadow-sm'
                      : 'text-[#6E4449] hover:text-[#5D2B31]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[#FDF7F6] rounded-3xl border border-[#B68488]/25 shadow-[0_8px_24px_rgba(110,53,59,0.06)] divide-y divide-[#B68488]/20 overflow-hidden">
            {visibleFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenId((curr) => (curr === item.id ? '' : item.id))
                    }
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#FAF0EE]/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9A656B]"
                  >
                    <div>
                      <span className="block text-[11px] font-medium text-[#9A656B] mb-0.5">
                        {item.category}
                      </span>
                      <span className="font-display text-lg sm:text-xl text-[#5D2B31] font-medium">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#9A656B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-0.5 text-sm leading-relaxed text-[#4E2A2E]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-[#6E4449] mt-6">
            Still wondering about a piece?{' '}
            <button
              type="button"
              onClick={onOpenContact}
              className="font-medium text-[#9A656B] hover:text-[#5D2B31] underline underline-offset-4 cursor-pointer"
            >
              Send a note to our atelier
            </button>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
