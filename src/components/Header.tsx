import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { RibbonBowIcon } from './Ornaments';

interface HeaderProps {
  bagCount: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBag: () => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'our-collection', label: 'Our Collection' },
  { id: 'about-us', label: 'About Us' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'wishlist', label: 'Wishlist' },
];

export function Header({
  bagCount,
  activeSection,
  onNavigate,
  onOpenBag,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#9A656B] text-white border-b border-white/15 shadow-[0_2px_14px_rgba(93,43,49,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md px-1 py-0.5"
        >
          <RibbonBowIcon className="w-7 h-5 text-white/95 shrink-0" />
          <span className="font-display text-xl sm:text-2xl tracking-wide font-medium">
            Elarion&rsquo;s Finery
          </span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-normal tracking-wide"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded ${
                  isActive ? 'opacity-100 font-medium' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-white transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action (Shopping Bag) + mobile menu toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag (${bagCount} items)`}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-150 text-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline font-medium">Bag</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-white text-[#6E353B] text-xs font-semibold tabular-nums">
              {bagCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/15 bg-[#915D63] px-4 py-3">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeSection === link.id
                    ? 'bg-white/15 font-medium text-white'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
