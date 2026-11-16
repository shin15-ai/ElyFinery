import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { EDITORIAL_MEDIA } from '../data/catalog';
import { BowDivider } from './Ornaments';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onExploreCollection: () => void;
}

export function HeroSection({ onExploreCollection }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden silk-hero-surface border-b border-[#B68488]/25"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px] lg:min-h-[600px]">
        {/* Left column: Brand display lockup */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-14 lg:py-20 relative z-10"
        >
          <BowDivider className="mb-6 max-w-[260px]" />

          <h1
            className="font-display text-[#6D3239] leading-[1.03] tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.75rem, 5vw, 4.35rem)',
              textWrap: 'balance',
            }}
          >
            <span className="italic font-medium block">Elarion&rsquo;s</span>
            <span className="block">
              <span className="italic font-medium">Fin</span>
              <span className="font-normal">ery</span>
            </span>
          </h1>

          <p className="font-display italic text-lg sm:text-xl text-[#6D3239]/90 mb-8 tracking-wide">
            Elegance in Every Detail
          </p>

          <button
            type="button"
            onClick={onExploreCollection}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium tracking-wide shadow-[0_6px_20px_rgba(110,53,59,0.22)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4D9D7]"
          >
            <span>Explore Our Collection</span>
            <Heart className="w-4 h-4 stroke-[1.75]" />
          </button>
        </motion.div>

        {/* Right column: Sweeping arched boutique dress rack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative flex items-stretch min-h-[340px] lg:min-h-full"
        >
          <div className="relative w-full h-full overflow-hidden lg:rounded-l-[280px] shadow-[-12px_0_40px_rgba(110,53,59,0.12)] border-l border-white/40">
            <ImageWithFallback
              src={EDITORIAL_MEDIA.heroBoutiqueRack}
              alt="Sunlit Elarion's Finery boutique dressing room with cream and dusty rose silk dresses"
              className="w-full h-full object-cover object-center lg:h-full"
              fallbackTitle="Elarion's Finery Dress Atelier"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#ECCBC9]/35 via-transparent to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
