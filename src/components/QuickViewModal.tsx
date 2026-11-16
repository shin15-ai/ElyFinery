import React, { useEffect, useState } from 'react';
import { Heart, Minus, Plus, Ruler, ShoppingBag, X } from 'lucide-react';
import { Product, SIZE_GUIDE_ROWS } from '../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface QuickViewModalProps {
  product: Product | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (
    product: Product,
    colorName: string,
    size: string,
    quantity: number
  ) => void;
}

export function QuickViewModal({
  product,
  isSaved,
  onClose,
  onToggleWishlist,
  onAddToBag,
}: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedColor(product.colorways[0]?.name || 'Signature');
    setSelectedSize(product.sizes[1] || product.sizes[0] || 'One Size');
    setQuantity(1);
    setShowSizeGuide(false);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#361B1E]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FDF7F6] rounded-3xl border border-[#B68488]/30 shadow-2xl grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#5D2B31] flex items-center justify-center shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Portrait Product Photo */}
        <div className="md:col-span-5 bg-[#F2DFDD] min-h-[280px]">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            fallbackTitle={product.name}
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs text-[#7D5257] pr-10">
              <span>{product.category}</span>
              <span aria-hidden="true"> &middot; </span>
              <span>{product.subcategory}</span>
              <span aria-hidden="true"> &middot; </span>
              <span>{product.fabric}</span>
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="quick-view-title"
                className="font-display text-2xl sm:text-3xl text-[#5D2B31] font-medium leading-tight"
              >
                {product.name}
              </h2>
              <span className="text-xl font-semibold text-[#5D2B31] tabular-nums shrink-0">
                ${product.price}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#4E2A2E]">
              {product.description}
            </p>

            {/* Colorways */}
            <div>
              <p className="text-xs font-medium text-[#5D2B31] mb-2">
                Shade: <span className="text-[#7D5257] font-normal">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-2.5">
                {product.colorways.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select shade ${color.name}`}
                      className={`w-7 h-7 rounded-full border transition-transform cursor-pointer ${
                        active
                          ? 'ring-2 ring-[#9A656B] ring-offset-2 ring-offset-[#FDF7F6] scale-105 border-[#5D2B31]/40'
                          : 'border-[#5D2B31]/25 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sizes + Size Guide toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-[#5D2B31]">
                  Size: <span className="text-[#7D5257] font-normal">{selectedSize}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#9A656B] hover:text-[#6D3239] underline underline-offset-2 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{showSizeGuide ? 'Hide Size Guide' : 'Size & Fit Guide'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-11 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        active
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

            {showSizeGuide && (
              <div className="p-3.5 rounded-xl bg-[#F6E6E4] border border-[#B68488]/25 text-xs">
                <p className="font-medium text-[#5D2B31] mb-2">Atelier Fit Guide</p>
                <table className="w-full text-left tabular-nums">
                  <thead>
                    <tr className="text-[#7D5257] border-b border-[#B68488]/25">
                      <th className="py-1 font-medium">Size</th>
                      <th className="py-1 font-medium">US</th>
                      <th className="py-1 font-medium">Bust</th>
                      <th className="py-1 font-medium">Waist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE_ROWS.map((row) => (
                      <tr key={row.size} className="border-b border-[#B68488]/10 last:border-none">
                        <td className="py-1 font-medium text-[#5D2B31]">{row.size}</td>
                        <td className="py-1">{row.us}</td>
                        <td className="py-1">{row.bust}</td>
                        <td className="py-1">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-xs text-[#6E4449] space-y-1 pt-2 border-t border-[#B68488]/15">
              <p>
                <strong className="font-medium text-[#5D2B31]">Fit:</strong>{' '}
                {product.fitNotes}
              </p>
              <p>
                <strong className="font-medium text-[#5D2B31]">Care:</strong>{' '}
                {product.careInstructions}
              </p>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#B68488]/20">
            <div className="inline-flex items-center rounded-full border border-[#B68488]/35 bg-white px-1 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full hover:bg-[#F6E6E4] flex items-center justify-center text-[#5D2B31] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium tabular-nums text-[#5D2B31]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full hover:bg-[#F6E6E4] flex items-center justify-center text-[#5D2B31] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToBag(product, selectedColor, selectedSize, quantity);
                onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag &middot; ${(product.price * quantity).toFixed(0)}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              className="w-11 h-11 rounded-full border border-[#B68488]/35 bg-white hover:bg-[#F6E6E4] flex items-center justify-center text-[#5D2B31] cursor-pointer shrink-0"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-[#9A656B] text-[#9A656B]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
