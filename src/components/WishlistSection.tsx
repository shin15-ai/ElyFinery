import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import { formatPrice, Product } from '../data/catalog';
import { BowDivider } from './Ornaments';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface WishlistSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product, colorName: string, size: string) => void;
}

export function WishlistSection({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
}: WishlistSectionProps) {
  const [mode, setMode] = useState<'featured' | 'saved'>('featured');
  const [startIndex, setStartIndex] = useState(0);

  const featuredProducts = products.filter((p) => p.isFeaturedFavorite);
  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));
  const activeList = mode === 'featured' ? featuredProducts : savedProducts;

  const visibleCount = 4;
  const maxStart = Math.max(0, activeList.length - visibleCount);

  const handlePrev = () => {
    if (activeList.length <= 1) return;
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  };

  const handleNext = () => {
    if (activeList.length <= 1) return;
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  const displayedItems =
    activeList.length <= visibleCount
      ? activeList
      : activeList.slice(startIndex, startIndex + visibleCount);

  return (
    <section
      id="wishlist"
      className="relative overflow-hidden silk-band-cream py-16 sm:py-20 border-t border-white/60"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Heading matching reference */}
        <ScrollReveal className="text-center max-w-xl mx-auto mb-8">
          <BowDivider className="mb-4 max-w-[380px]" />
          <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-1.5">
            Wishlist
          </h2>
          <p className="text-sm sm:text-base text-[#6E4449] mb-5">
            Our featured favorites.
          </p>

          {/* Toggle between Featured Favorites and My Saved Wishlist */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#F2D9D7]/70 border border-[#B68488]/25">
            <button
              type="button"
              onClick={() => {
                setMode('featured');
                setStartIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                mode === 'featured'
                  ? 'bg-[#FDF7F6] text-[#5D2B31] shadow-sm'
                  : 'text-[#6E4449] hover:text-[#5D2B31]'
              }`}
            >
              Featured Favorites
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('saved');
                setStartIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                mode === 'saved'
                  ? 'bg-[#9A656B] text-white shadow-sm'
                  : 'text-[#6E4449] hover:text-[#5D2B31]'
              }`}
            >
              My Saved ({savedProducts.length})
            </button>
          </div>
        </ScrollReveal>

        {/* Horizontal 4-Card Showcase with Arrow Controls */}
        <ScrollReveal delay={0.1}>
        {activeList.length === 0 ? (
          <div className="bg-[#FDF7F6] border border-[#B68488]/25 rounded-2xl p-10 text-center max-w-lg mx-auto">
            <p className="font-display text-xl text-[#6D3239] mb-2">
              Your personal wishlist is waiting
            </p>
            <p className="text-sm text-[#6E4449] mb-5">
              Tap the heart icon on any dress, handbag, or accessory above to
              curate your dream wardrobe.
            </p>
            <button
              type="button"
              onClick={() => setMode('featured')}
              className="px-5 py-2 rounded-full bg-[#9A656B] text-white text-xs font-medium hover:bg-[#825056] transition-colors cursor-pointer"
            >
              View Featured Favorites
            </button>
          </div>
        ) : (
          <div className="relative flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous wishlist favorites"
              className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white shadow-sm transition-transform hover:scale-105 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayedItems.map((item) => {
                const isSaved = wishlistIds.includes(item.id);
                const defaultColor = item.colorways[0]?.name || 'Signature';
                const defaultSize = item.sizes[1] || item.sizes[0] || 'One Size';

                return (
                  <div
                    key={item.id}
                    className="group bg-[#FDF7F6] rounded-2xl border border-[#B68488]/25 overflow-hidden shadow-[0_6px_18px_rgba(110,53,59,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] bg-[#F2DFDD] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onQuickView(item)}
                        className="block w-full h-full cursor-pointer"
                        aria-label={`Inspect ${item.name}`}
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          fallbackTitle={item.name}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(item.id)}
                        aria-label={
                          isSaved
                            ? `Remove ${item.name} from wishlist`
                            : `Save ${item.name} to wishlist`
                        }
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FDF7F6]/90 hover:bg-white flex items-center justify-center shadow-sm cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isSaved
                              ? 'fill-[#9A656B] text-[#9A656B]'
                              : 'text-[#6D3239]'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-3.5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display text-sm text-[#5D2B31] font-medium truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#7D5257] tabular-nums">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddToBag(item, defaultColor, defaultSize)}
                        aria-label={`Add ${item.name} to bag`}
                        className="w-8 h-8 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next wishlist favorites"
              className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white shadow-sm transition-transform hover:scale-105 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        </ScrollReveal>
      </div>
    </section>
  );
}
