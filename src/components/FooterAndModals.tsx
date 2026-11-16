import React, { useEffect, useState } from 'react';
import { Check, Heart, Instagram, Mail, X } from 'lucide-react';
import { BowDivider, RibbonBowIcon } from './Ornaments';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

export type InfoModalType = 'about' | 'story' | 'contact' | null;

interface FooterProps {
  onOpenContact: () => void;
  onNavigate: (id: string) => void;
}

function CornerSatinRibbon({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none w-44 sm:w-56 h-auto text-[#B47D83] ${
        flipped ? '-scale-x-100' : ''
      }`}
      aria-hidden="true"
    >
      <path
        d="M-10 175C45 148 82 118 110 82C132 54 92 26 62 56C35 84 62 126 114 96C150 75 180 96 208 158"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.24"
      />
      <path
        d="M20 178C60 144 92 108 106 86"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.18"
      />
    </svg>
  );
}

export function Footer({ onOpenContact, onNavigate }: FooterProps) {
  return (
    <footer className="relative overflow-hidden silk-band-soft pt-14 pb-10 border-t border-white/50">
      {/* Soft satin ribbon corner motifs matching reference */}
      <div className="hidden sm:block absolute bottom-0 left-0 opacity-85">
        <CornerSatinRibbon />
      </div>
      <div className="hidden sm:block absolute bottom-0 right-0 opacity-85">
        <CornerSatinRibbon flipped />
      </div>

      <ScrollReveal className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <BowDivider className="mb-4 max-w-[380px]" />

        <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-1">
          Contact Us
        </h2>
        <p className="font-display italic text-sm sm:text-base text-[#6E4449] mb-6">
          Let&rsquo;s stay connected!
        </p>

        {/* Social & Contact icon row with vertical hairline rules */}
        <div className="inline-flex items-center justify-center gap-6 mb-8">
          <a
            href="https://www.instagram.com/elarionsfinery?obrf=MW5hdmYyYjFmMGJlNQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Elarion's Finery on Instagram"
            className="p-2 text-[#6D3239] hover:text-[#9A656B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A656B] rounded-full"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <span className="h-6 w-px bg-[#B68488]/60" aria-hidden="true" />
          <button
            type="button"
            onClick={onOpenContact}
            aria-label="Send a note to Elarion's Finery"
            className="p-2 text-[#6D3239] hover:text-[#9A656B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A656B] rounded-full"
          >
            <Mail className="w-5 h-5" />
          </button>
        </div>

        {/* Quiet navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6E4449] mb-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            Home
          </a>
          <a
            href="#our-collection"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('our-collection');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            Our Collection
          </a>
          <a
            href="#about-us"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about-us');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            About Us
          </a>
          <a
            href="#our-story"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('our-story');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            Our Story
          </a>
          <a
            href="#wishlist"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('wishlist');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            Wishlist
          </a>
          <a
            href="#reviews"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('reviews');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            Reviews
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('faq');
            }}
            className="hover:text-[#5D2B31] transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Bottom signature line matching reference */}
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto pt-4 border-t border-[#B68488]/35">
          <p className="font-display italic text-xs sm:text-sm text-[#6D3239] flex items-center gap-2">
            <span>Elarion&rsquo;s Finery</span>
            <Heart className="w-3.5 h-3.5 text-[#9A656B]" />
            <span>Elegance in Every Detail</span>
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
}

export function InfoModal({
  type,
  onClose,
}: {
  type: InfoModalType;
  onClose: () => void;
}) {
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setContactEmail('');
    setContactMessage('');
  }, [type]);

  useEffect(() => {
    if (!type) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#361B1E]/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          type === 'about' ? 'max-w-2xl' : 'max-w-lg'
        } max-h-[90vh] overflow-y-auto bg-[#FDF7F6] rounded-3xl border border-[#B68488]/30 p-6 sm:p-9 shadow-2xl text-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-[#F3DFDD] flex items-center justify-center text-[#5D2B31] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <RibbonBowIcon className="w-8 h-5 text-[#9A656B] mx-auto mb-3" />

        {type === 'about' && (
          <div className="space-y-4">
            <h3 className="font-display text-3xl text-[#6D3239]">
              Inside the Atelier
            </h3>
            <p className="text-sm leading-relaxed text-[#4E2A2E]">
              Conceived and designed by{' '}
              <strong className="font-semibold text-[#5D2B31]">Ericson</strong>{' '}
              and{' '}
              <strong className="font-semibold text-[#5D2B31]">Trixie</strong>,
              every silhouette at <em>Elarion&rsquo;s Finery</em> is draped in
              small batches using breathable mulberry silk, organic cotton lace,
              and hand-finished French seams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
              <div className="p-3.5 rounded-2xl bg-[#F8E6E4]/80 border border-[#B68488]/20">
                <p className="font-display text-sm font-medium text-[#5D2B31] mb-1">
                  Natural Fibers
                </p>
                <p className="text-xs text-[#6E4449]">
                  100% silk charmeuse, chiffon &amp; fine merino knits.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8E6E4]/80 border border-[#B68488]/20">
                <p className="font-display text-sm font-medium text-[#5D2B31] mb-1">
                  Tailored Drape
                </p>
                <p className="text-xs text-[#6E4449]">
                  Bias-cut bodices and adjustable ribbon ties for effortless fit.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8E6E4]/80 border border-[#B68488]/20">
                <p className="font-display text-sm font-medium text-[#5D2B31] mb-1">
                  Keepsake Care
                </p>
                <p className="text-xs text-[#6E4449]">
                  Delivered in satin-ribboned boxes with cotton dust bags.
                </p>
              </div>
            </div>

            {/* The creators behind Elarion's Finery */}
            <div className="pt-5 mt-2 border-t border-[#B68488]/25">
              <h4 className="font-display text-2xl text-[#6D3239] mb-4">
                The creators behind Elarion&rsquo;s Finery
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-center">
                <div className="bg-white/80 rounded-2xl border border-[#B68488]/25 p-4 shadow-xs">
                  <div className="w-full aspect-[3/4] rounded-t-[999px] rounded-b-xl overflow-hidden bg-[#F2DFDD] mb-3 border border-[#B68488]/20">
                    <ImageWithFallback
                      src="/assets/aistudio/IMG_20261116_223529_020_b5f52b05.jpeg"
                      alt="Trixie, Co-creator and Design Planner of Elarion's Finery"
                      className="w-full h-full object-cover object-top"
                      fallbackTitle="Trixie"
                    />
                  </div>
                  <p className="font-display text-xl text-[#5D2B31] font-medium">
                    Trixie
                  </p>
                  <p className="text-xs text-[#7D5257] mt-0.5">
                    Co-creator &amp; Design Planner
                  </p>
                </div>

                <div className="bg-white/80 rounded-2xl border border-[#B68488]/25 p-4 shadow-xs">
                  <div className="w-full aspect-[3/4] rounded-t-[999px] rounded-b-xl overflow-hidden bg-[#F2DFDD] mb-3 border border-[#B68488]/20">
                    <ImageWithFallback
                      src="/assets/aistudio/IMG_20261116_223324_620_5b6026b2.png"
                      alt="Ericson, Co-creator and Web Developer of Elarion's Finery"
                      className="w-full h-full object-cover object-top"
                      fallbackTitle="Ericson"
                    />
                  </div>
                  <p className="font-display text-xl text-[#5D2B31] font-medium">
                    Ericson
                  </p>
                  <p className="text-xs text-[#7D5257] mt-0.5">
                    Co-creator &amp; Web Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'story' && (
          <div className="space-y-4">
            <h3 className="font-display text-3xl text-[#6D3239]">
              Our Story &amp; Promise
            </h3>
            <p className="text-sm leading-relaxed text-[#4E2A2E]">
              Founded with a single vintage dress form and a sketchbook full of
              satin ribbons, <em>Elarion&rsquo;s Finery</em> creates garments meant
              to feel like a handwritten love letter.
            </p>
            <p className="text-sm leading-relaxed text-[#4E2A2E]">
              We believe getting dressed should feel calm, unhurried, and joyful—
              never rushed by fleeting trends. Use code{' '}
              <strong className="text-[#9A656B]">ELARION10</strong> in your
              shopping bag for 10% off your first atelier piece.
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <h3 className="font-display text-3xl text-[#6D3239]">
              Stay Connected
            </h3>
            <p className="text-sm text-[#6E4449]">
              Join our atelier guest list for seasonal dress previews or send a
              sizing question to our stylists.
            </p>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-[#F6E6E4] border border-[#B68488]/30 space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#9A656B] text-white flex items-center justify-center mx-auto">
                  <Check className="w-4 h-4" />
                </div>
                <p className="font-display text-lg text-[#5D2B31]">
                  Thank you for writing to us
                </p>
                <p className="text-xs text-[#6E4449]">
                  We&rsquo;ve noted {contactEmail} and will reply warmly from the
                  atelier.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-left">
                <div>
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Note or Sizing Question (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Ask us about dress length, custom ribbon colors, or styling..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Send Note to Atelier
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
