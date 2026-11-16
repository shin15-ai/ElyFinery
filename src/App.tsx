import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  BagItem,
  CATALOG_PRODUCTS,
  CategoryType,
  OrderReceipt,
  Product,
} from './data/catalog';
import { INITIAL_REVIEWS, Review } from './data/reviews';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutUsSection, OurStorySection } from './components/AboutAndStory';
import { CollectionSection } from './components/CollectionSection';
import { WishlistSection } from './components/WishlistSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { QuickViewModal } from './components/QuickViewModal';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { Footer, InfoModal, InfoModalType } from './components/FooterAndModals';

const STORAGE_KEYS = {
  bag: 'elarion_bag_v1',
  wishlist: 'elarion_wishlist_v1',
  receipt: 'elarion_receipt_v1',
  reviews: 'elarion_reviews_v1',
  helpful: 'elarion_helpful_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [bagItems, setBagItems] = useState<BagItem[]>(() =>
    readStorage<BagItem[]>(STORAGE_KEYS.bag, [])
  );
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.wishlist, [
      'rosette-bow-dress',
      'coquette-blush-bag',
    ])
  );
  const [lastOrderReceipt, setLastOrderReceipt] = useState<OrderReceipt | null>(
    () => readStorage<OrderReceipt | null>(STORAGE_KEYS.receipt, null)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    readStorage<Review[]>(STORAGE_KEYS.reviews, INITIAL_REVIEWS)
  );
  const [helpfulIds, setHelpfulIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.helpful, [])
  );

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.bag, JSON.stringify(bagItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [bagItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.wishlist,
        JSON.stringify(wishlistIds)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    if (!lastOrderReceipt) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.receipt,
        JSON.stringify(lastOrderReceipt)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [lastOrderReceipt]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
    } catch {
      // Ignore storage quota errors
    }
  }, [reviews]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.helpful,
        JSON.stringify(helpfulIds)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [helpfulIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2400);
  };

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const product = CATALOG_PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`Removed ${product.name} from wishlist`);
        return prev.filter((id) => id !== productId);
      }
      if (product) showToast(`Saved ${product.name} to wishlist`);
      return [...prev, productId];
    });
  };

  const handleAddToBag = (
    product: Product,
    colorName: string,
    size: string,
    quantity = 1
  ) => {
    setBagItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.colorName === colorName &&
          item.size === size
      );
      if (existingIdx >= 0) {
        return prev.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        { productId: product.id, colorName, size, quantity },
      ];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
  };

  const handleUpdateQuantity = (
    productId: string,
    colorName: string,
    size: string,
    delta: number
  ) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId &&
          item.colorName === colorName &&
          item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (
    productId: string,
    colorName: string,
    size: string
  ) => {
    setBagItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.colorName === colorName &&
            item.size === size
          )
      )
    );
  };

  const handleToggleHelpful = (reviewId: string) => {
    setHelpfulIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSubmitReview = (input: {
    productId: string | 'boutique';
    authorName: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: input.productId,
      authorName: input.authorName,
      rating: input.rating,
      title: input.title,
      comment: input.comment,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      helpfulCount: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you for sharing your review!');
  };

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col bg-[#F8E6E4] text-[#4E2A2E]">
      <div className="bg-[#7D4B51] text-[#FDF7F6] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wide border-b border-white/10">
        <span className="font-medium">Published November 15, 2026</span>
        <span aria-hidden="true" className="mx-2 text-white/60">&middot;</span>
        <span className="text-white/90">Complimentary shipping on orders over ₱4,500</span>
      </div>

      <Header
        bagCount={bagCount}
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onOpenBag={() => setIsBagOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          onExploreCollection={() => {
            setSelectedCategory('All');
            navigateToSection('our-collection');
          }}
        />

        <AboutUsSection onLearnMore={() => setInfoModal('about')} />

        <CollectionSection
          products={CATALOG_PRODUCTS}
          reviews={reviews}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToBag={(product, colorName, size) =>
            handleAddToBag(product, colorName, size, 1)
          }
        />

        <OurStorySection onDiscoverStory={() => setInfoModal('story')} />

        <WishlistSection
          products={CATALOG_PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToBag={(product, colorName, size) =>
            handleAddToBag(product, colorName, size, 1)
          }
        />

        <ReviewsSection
          reviews={reviews}
          products={CATALOG_PRODUCTS}
          helpfulIds={helpfulIds}
          onToggleHelpful={handleToggleHelpful}
          onSubmitReview={handleSubmitReview}
        />

        <FaqSection onOpenContact={() => setInfoModal('contact')} />
      </main>

      <Footer
        onOpenContact={() => setInfoModal('contact')}
        onNavigate={navigateToSection}
      />

      <QuickViewModal
        product={quickViewProduct}
        reviews={reviews}
        isSaved={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        onSubmitReview={handleSubmitReview}
      />

      <ShoppingBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        bagItems={bagItems}
        products={CATALOG_PRODUCTS}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setBagItems([])}
        lastOrderReceipt={lastOrderReceipt}
        onOrderConfirmed={(receipt) => setLastOrderReceipt(receipt)}
      />

      <InfoModal type={infoModal} onClose={() => setInfoModal(null)} />

      {/* Subtle boutique toast confirmation */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-5 py-3 rounded-full bg-[#5D2B31] text-white text-xs sm:text-sm font-medium shadow-lg border border-white/15 flex items-center gap-3"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            className="underline underline-offset-2 text-white/90 hover:text-white cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
    </MotionConfig>
  );
}
