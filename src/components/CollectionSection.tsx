import React, { useMemo, useRef, useState } from 'react';
import {
  Check,
  Eye,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  CategoryType,
  COLLECTION_GATEWAYS,
  formatPrice,
  Product,
} from '../data/catalog';
import { BowDivider, SparkleStar } from './Ornaments';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';

interface CollectionSectionProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product, colorName: string, size: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

const CATEGORY_TABS: Array<{ value: CategoryType; label: string }> = [
  { value: 'All', label: 'All Pieces' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'More', label: 'More' },
];

export function CollectionSection({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
}: CollectionSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const catalogGridRef = useRef<HTMLDivElement>(null);

  const handleGatewayClick = (category: CategoryType) => {
    onSelectCategory(category);
    setSavedOnly(false);
    catalogGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (savedOnly && !wishlistIds.includes(item.id)) {
        return false;
      }
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.fabric.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, selectedCategory, savedOnly, wishlistIds, searchQuery, sortBy]);

  const handleCardAddToBag = (product: Product) => {
    const activeColor =
      selectedColors[product.id] || product.colorways[0]?.name || 'Signature';
    const activeSize =
      selectedSizes[product.id] || product.sizes[1] || product.sizes[0] || 'One Size';
    onAddToBag(product, activeColor, activeSize);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  const resetFilters = () => {
    onSelectCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setSavedOnly(false);
  };

  return (
    <section
      id="our-collection"
      className="relative overflow-hidden silk-band-cream py-16 sm:py-24 border-t border-white/60"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative">
        <SparkleStar className="hidden md:block absolute left-3 top-44 w-4 h-4 text-[#B68488]/65" />
        <SparkleStar className="hidden md:block absolute left-0 top-52 w-2.5 h-2.5 text-[#B68488]/50" />
        <SparkleStar className="hidden md:block absolute right-3 top-48 w-4 h-4 text-[#B68488]/65" />

        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <BowDivider className="mb-4 max-w-[380px]" />
          <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-2">
            Our Collection
          </h2>
          <p className="text-sm sm:text-base text-[#6E4449]">
            Timeless pieces for every occasion.
          </p>
        </ScrollReveal>

        {/* 3 Signature Category Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {COLLECTION_GATEWAYS.map((gateway, idx) => {
            const isSelected = selectedCategory === gateway.category && !savedOnly;
            return (
              <ScrollReveal key={gateway.category} delay={idx * 0.08}>
                <button
                  type="button"
                  onClick={() => handleGatewayClick(gateway.category)}
                  className={`group relative w-full aspect-[4/3] rounded-2xl overflow-hidden text-left shadow-[0_8px_24px_rgba(110,53,59,0.1)] transition-all duration-200 hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239] ${
                    isSelected
                      ? 'ring-2 ring-[#9A656B] ring-offset-2 ring-offset-[#F8E9E7]'
                      : 'border border-white/70'
                  }`}
                >
                <ImageWithFallback
                  src={gateway.image}
                  alt={gateway.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackTitle={gateway.label}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#3E1D21]/35 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-3 flex justify-center px-3">
                  <span className="px-6 py-1.5 rounded-full bg-[#FDF7F6]/95 text-[#5D2B31] font-display text-sm sm:text-base shadow-sm border border-[#B68488]/25 group-hover:bg-[#9A656B] group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                    {gateway.label}
                  </span>
                </div>
              </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Centered Browse All CTA */}
        <div className="flex justify-center mb-14">
          <button
            type="button"
            onClick={() => handleGatewayClick('All')}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-[0_4px_14px_rgba(110,53,59,0.2)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239]"
          >
            <span>Browse All</span>
            <Heart className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>

        {/* Interactive Boutique Shop Toolbar */}
        <ScrollReveal delay={0.08}>
          <div
            ref={catalogGridRef}
            className="scroll-mt-24 pt-8 border-t border-[#B68488]/25"
          >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Category Segmented Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter collection by category"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2D9D7]/70 rounded-xl border border-[#B68488]/20 self-start"
            >
              {CATEGORY_TABS.map((tab) => {
                const active = selectedCategory === tab.value && !savedOnly;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      onSelectCategory(tab.value);
                      setSavedOnly(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239] ${
                      active
                        ? 'bg-[#FDF7F6] text-[#5D2B31] shadow-sm'
                        : 'text-[#6E4449] hover:text-[#5D2B31]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSavedOnly((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D3239] ${
                  savedOnly
                    ? 'bg-[#9A656B] text-white shadow-sm'
                    : 'text-[#6E4449] hover:text-[#5D2B31]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${savedOnly ? 'fill-white' : ''}`} />
                <span>Saved</span>
                <span className="tabular-nums">({wishlistIds.length})</span>
              </button>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#8D5B60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, silk, pearls..."
                  aria-label="Search boutique collection"
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FDF7F6] border border-[#B68488]/30 text-sm text-[#4E2A2E] placeholder:text-[#8D5B60]/75 focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8D5B60] hover:text-[#5D2B31] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="relative flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8D5B60] absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Sort products"
                  className="pl-8 pr-7 py-2 rounded-xl bg-[#FDF7F6] border border-[#B68488]/30 text-sm text-[#4E2A2E] focus:outline-none focus:ring-2 focus:ring-[#9A656B] cursor-pointer"
                >
                  <option value="featured">Curated Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Uniform 3-Column Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FDF7F6] border border-[#B68488]/25 rounded-2xl p-12 text-center">
              <p className="font-display text-2xl text-[#6D3239] mb-2">
                No pieces match your selection
              </p>
              <p className="text-sm text-[#6E4449] mb-6 max-w-md mx-auto">
                {savedOnly
                  ? 'Tap the heart icon on any dress or accessory to save it to your personal wishlist.'
                  : 'Try clearing your search or switching back to all boutique pieces.'}
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Show All Pieces
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product) => {
                const isSaved = wishlistIds.includes(product.id);
                const activeColor =
                  selectedColors[product.id] || product.colorways[0]?.name || '';
                const activeSize =
                  selectedSizes[product.id] ||
                  product.sizes[1] ||
                  product.sizes[0] ||
                  'One Size';
                const isJustAdded = justAddedId === product.id;

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col bg-[#FDF7F6] rounded-2xl border border-[#B68488]/20 overflow-hidden shadow-[0_6px_22px_rgba(110,53,59,0.06)] hover:shadow-[0_12px_30px_rgba(110,53,59,0.12)] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {/* Product Photography (70% card focal point) */}
                    <div className="relative aspect-[3/4] bg-[#F2DFDD] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="block w-full h-full cursor-pointer focus-visible:outline-none"
                        aria-label={`Quick view ${product.name}`}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          fallbackTitle={product.name}
                        />
                      </button>

                      {/* Wishlist Heart Button */}
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        aria-label={
                          isSaved
                            ? `Remove ${product.name} from wishlist`
                            : `Save ${product.name} to wishlist`
                        }
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#FDF7F6]/90 hover:bg-white text-[#6D3239] flex items-center justify-center shadow-sm transition-transform duration-150 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A656B]"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isSaved
                              ? 'fill-[#9A656B] text-[#9A656B]'
                              : 'text-[#6D3239]'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Clean Product Metadata & Controls */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        {/* Quiet unboxed metadata line */}
                        <div className="flex items-center justify-between gap-2 text-xs text-[#7D5257] mb-1.5">
                          <span className="truncate">
                            {product.subcategory} &middot; {product.fabric}
                          </span>
                          {product.badge && (
                            <span className="shrink-0 font-medium text-[#9A656B]">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-lg text-[#5D2B31] font-medium leading-snug">
                            <button
                              type="button"
                              onClick={() => onQuickView(product)}
                              className="text-left hover:text-[#9A656B] transition-colors cursor-pointer"
                            >
                              {product.name}
                            </button>
                          </h3>
                          <span className="text-[15px] font-semibold text-[#5D2B31] tabular-nums shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-[#B68488]/15">
                        {/* Colorway Swatches + Size Row */}
                        <div className="flex items-center justify-between gap-2">
                          <div
                            className="flex items-center gap-1.5"
                            role="group"
                            aria-label={`Colorways for ${product.name}`}
                          >
                            {product.colorways.map((color) => {
                              const selected = activeColor === color.name;
                              return (
                                <button
                                  key={color.name}
                                  type="button"
                                  title={color.name}
                                  aria-label={`Select ${color.name}`}
                                  onClick={() =>
                                    setSelectedColors((prev) => ({
                                      ...prev,
                                      [product.id]: color.name,
                                    }))
                                  }
                                  className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                                    selected
                                      ? 'ring-2 ring-[#9A656B] ring-offset-1 ring-offset-[#FDF7F6] scale-110 border-[#6D3239]/40'
                                      : 'border-[#6D3239]/25 hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: color.hex }}
                                />
                              );
                            })}
                          </div>

                          <div
                            className="flex items-center gap-1"
                            role="group"
                            aria-label={`Sizes for ${product.name}`}
                          >
                            {product.sizes.map((size) => {
                              const selected = activeSize === size;
                              return (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() =>
                                    setSelectedSizes((prev) => ({
                                      ...prev,
                                      [product.id]: size,
                                    }))
                                  }
                                  className={`min-w-7 h-7 px-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                                    selected
                                      ? 'bg-[#9A656B] text-white'
                                      : 'bg-[#F3DFDD]/70 text-[#5D2B31] hover:bg-[#EAD0CD]'
                                  }`}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onQuickView(product)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-[#B68488]/40 text-xs font-medium text-[#5D2B31] hover:bg-[#F3DFDD]/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCardAddToBag(product)}
                            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                              isJustAdded
                                ? 'bg-[#5D2B31] text-white'
                                : 'bg-[#9A656B] hover:bg-[#825056] text-white'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added to Bag</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Bag</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
