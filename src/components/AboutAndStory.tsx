import React from 'react';
import { Heart } from 'lucide-react';
import { EDITORIAL_MEDIA } from '../data/catalog';
import {
  BotanicalRoseIllustration,
  BowDivider,
  SparkleStar,
} from './Ornaments';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface AboutAndStoryProps {
  onLearnMore: () => void;
  onDiscoverStory: () => void;
}

export function AboutUsSection({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden silk-band-soft py-16 sm:py-24"
    >
      {/* Delicate rose sketch on far right edge */}
      <BotanicalRoseIllustration className="hidden lg:block absolute right-0 top-10 w-52 h-80 pointer-events-none opacity-75" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: Arched sunlit satin dress mannequin */}
          <ScrollReveal className="lg:col-span-5 flex justify-center relative">
            <SparkleStar className="hidden sm:block absolute -left-2 top-20 w-3.5 h-3.5 text-[#B68488]/65" />
            <SparkleStar className="hidden sm:block absolute left-4 top-28 w-2.5 h-2.5 text-[#B68488]/50" />

            <div className="w-full max-w-[330px] aspect-[3/4] rounded-t-[999px] rounded-b-xl overflow-hidden shadow-[0_14px_38px_rgba(110,53,59,0.14)] border border-white/50 bg-[#F3D8D6]">
              <ImageWithFallback
                src={EDITORIAL_MEDIA.aboutSatinMannequin}
                alt="Champagne blush satin cowl-neck evening gown on dressmaker mannequin"
                className="w-full h-full object-cover"
                fallbackTitle="Satin Atelier Gown"
              />
            </div>
          </ScrollReveal>

          {/* Right column: About Us copy */}
          <ScrollReveal delay={0.1} className="lg:col-span-7 text-center max-w-xl mx-auto relative z-10">
            <BowDivider className="mb-4 max-w-[340px]" />

            <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-5">
              About Us
            </h2>

            <p className="text-[15px] sm:text-base leading-relaxed text-[#4E2A2E] mb-4">
              Welcome to{' '}
              <span className="font-display italic font-semibold text-[#5D2B31]">
                Elarion&rsquo;s Finery
              </span>
              . We are a fashion brand dedicated to celebrating elegance,
              confidence, and individuality through women&rsquo;s clothing and
              accessories.
            </p>

            <p className="text-[15px] sm:text-base leading-relaxed text-[#4E2A2E] mb-4">
              Our goal is to provide a pleasant fashion experience where every
              woman can discover styles that reflect her unique self.
            </p>

            <p className="text-sm sm:text-[15px] leading-relaxed text-[#6D3239] italic font-display mb-8">
              Thoughtfully designed and curated by{' '}
              <span className="font-semibold not-italic">Ericson</span> &amp;{' '}
              <span className="font-semibold not-italic">Trixie</span>.
            </p>

            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-[0_4px_14px_rgba(110,53,59,0.18)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239]"
            >
              <span>Learn More</span>
              <Heart className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function OurStorySection({ onDiscoverStory }: { onDiscoverStory: () => void }) {
  return (
    <section
      id="our-story"
      className="relative overflow-hidden silk-band-soft py-16 sm:py-24 border-t border-white/40"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: Ribbon-tied stationery envelope & blush roses */}
          <ScrollReveal className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_14px_38px_rgba(110,53,59,0.14)] border border-white/60 bg-[#F3D8D6]">
              <ImageWithFallback
                src={EDITORIAL_MEDIA.storyRibbonEnvelope}
                alt="Fresh blush garden roses and cream envelope tied with a satin ribbon"
                className="w-full h-full object-cover"
                fallbackTitle="Elarion's Finery Keepsake Envelope"
              />
            </div>
          </ScrollReveal>

          {/* Right column: Our Story narrative */}
          <ScrollReveal delay={0.1} className="lg:col-span-6 text-center max-w-lg mx-auto">
            <BowDivider className="mb-4 max-w-[340px]" />

            <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-5">
              Our Story
            </h2>

            <p className="text-[15px] sm:text-base leading-relaxed text-[#4E2A2E] mb-4">
              <span className="font-display italic font-semibold text-[#5D2B31]">
                Elarion&rsquo;s Finery
              </span>{' '}
              was born from a simple dream &mdash; to create a space where
              fashion meets self-love.
            </p>

            <p className="text-[15px] sm:text-base leading-relaxed text-[#4E2A2E] mb-8">
              What started as a passion for elegant styles has grown into a
              brand that empowers women to express themselves with confidence
              and grace.
            </p>

            <button
              type="button"
              onClick={onDiscoverStory}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-[0_4px_14px_rgba(110,53,59,0.18)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239]"
            >
              <span>Discover Our Story</span>
              <Heart className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function AboutAndStory({
  onLearnMore,
  onDiscoverStory,
}: AboutAndStoryProps) {
  return (
    <>
      <AboutUsSection onLearnMore={onLearnMore} />
      <OurStorySection onDiscoverStory={onDiscoverStory} />
    </>
  );
}
