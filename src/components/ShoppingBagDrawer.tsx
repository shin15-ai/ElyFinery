import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { BagItem, formatPrice, OrderReceipt, Product } from '../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';
import { RibbonBowIcon } from './Ornaments';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bagItems: BagItem[];
  products: Product[];
  onUpdateQuantity: (
    productId: string,
    colorName: string,
    size: string,
    delta: number
  ) => void;
  onRemoveItem: (productId: string, colorName: string, size: string) => void;
  onClearBag: () => void;
  lastOrderReceipt: OrderReceipt | null;
  onOrderConfirmed: (receipt: OrderReceipt) => void;
}

const FREE_SHIPPING_THRESHOLD = 4500;
const SHIPPING_FEE = 180;

export function ShoppingBagDrawer({
  isOpen,
  onClose,
  bagItems,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
  lastOrderReceipt,
  onOrderConfirmed,
}: ShoppingBagDrawerProps) {
  const [step, setStep] = useState<'bag' | 'shipping' | 'confirmed'>('bag');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  // Shipping form state
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash on Delivery'>('Card');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && bagItems.length > 0 && step === 'confirmed') {
      setStep('bag');
    }
  }, [isOpen, bagItems.length, step]);

  if (!isOpen) return null;

  const detailedItems = bagItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = appliedPromo === 'ELARION10' ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping =
    detailedItems.length === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;
  const total = discountedSubtotal + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const shippingProgress = Math.min(
    100,
    Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'ELARION10') {
      setAppliedPromo('ELARION10');
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Try welcome code ELARION10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !email.trim() ||
      !address.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      setFormError('Please complete all required shipping fields.');
      return;
    }

    const receipt: OrderReceipt = {
      orderNumber: `EF-${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: customerName.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: detailedItems.map((item) => ({
        name: item.product.name,
        colorName: item.colorName,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      subtotal,
      discount,
      shipping,
      total,
    };

    setFormError('');
    onOrderConfirmed(receipt);
    onClearBag();
    setAppliedPromo(null);
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 flex justify-end bg-[#361B1E]/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#FDF7F6] text-[#4E2A2E] shadow-2xl border-l border-[#B68488]/25 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#B68488]/20 flex items-center justify-between bg-[#F8E6E4]/65">
          <div className="flex items-center gap-2.5">
            {step === 'shipping' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="w-8 h-8 rounded-full hover:bg-white/70 flex items-center justify-center text-[#5D2B31] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <RibbonBowIcon className="w-6 h-4 text-[#9A656B]" />
            <h2 className="font-display text-xl text-[#5D2B31] font-medium">
              {step === 'bag' && 'Your Shopping Bag'}
              {step === 'shipping' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-full hover:bg-white/80 flex items-center justify-center text-[#5D2B31] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Bag Contents */}
        {step === 'bag' && (
          <>
            {detailedItems.length > 0 && (
              <div className="px-6 py-3 bg-[#F4DFDD]/70 border-b border-[#B68488]/15">
                <div className="flex items-center justify-between text-xs text-[#5D2B31] mb-1.5">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#9A656B]" />
                    {amountToFreeShipping === 0 ? (
                      <span>Complimentary atelier shipping unlocked</span>
                    ) : (
                      <span>
                        Add <strong className="tabular-nums">{formatPrice(amountToFreeShipping)}</strong> more
                        for complimentary shipping
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums font-medium">{shippingProgress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/80 overflow-hidden">
                  <div
                    className="h-full bg-[#9A656B] rounded-full transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {detailedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#F4DFDD] flex items-center justify-center text-[#9A656B] mb-4">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="font-display text-2xl text-[#5D2B31] mb-2">
                    Your bag is currently empty
                  </p>
                  <p className="text-sm text-[#6E4449] max-w-xs mb-6">
                    Explore our satin dresses, bow knitwear, and pearl accents to
                    curate your look.
                  </p>
                  {lastOrderReceipt && (
                    <button
                      type="button"
                      onClick={() => setStep('confirmed')}
                      className="mb-3 text-xs font-medium text-[#9A656B] underline underline-offset-4 cursor-pointer"
                    >
                      View recent receipt ({lastOrderReceipt.orderNumber})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                detailedItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.colorName}-${item.size}`}
                    className="flex gap-4 p-3 rounded-2xl bg-white border border-[#B68488]/20"
                  >
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#F2DFDD] shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        fallbackTitle={item.product.name}
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-base text-[#5D2B31] font-medium leading-snug truncate">
                            {item.product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() =>
                              onRemoveItem(item.productId, item.colorName, item.size)
                            }
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#8D5B60] hover:text-[#5D2B31] p-1 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#7D5257] mt-0.5">
                          {item.colorName} &middot; Size {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center rounded-full border border-[#B68488]/30 bg-[#FDF7F6]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.productId,
                                item.colorName,
                                item.size,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#5D2B31] hover:bg-[#F3DFDD] rounded-full cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                item.productId,
                                item.colorName,
                                item.size,
                                1
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#5D2B31] hover:bg-[#F3DFDD] rounded-full cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#5D2B31] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {detailedItems.length > 0 && (
              <div className="p-6 border-t border-[#B68488]/20 bg-[#FAF0EE] space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#8D5B60] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (try ELARION10)"
                        aria-label="Promo code"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#B68488]/30 text-xs text-[#4E2A2E] placeholder:text-[#8D5B60]/70 focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl border border-[#9A656B] text-xs font-medium text-[#5D2B31] hover:bg-[#9A656B] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-[#9A656B]">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <p className="text-xs text-[#5D2B31] font-medium">
                      Welcome privilege {appliedPromo} applied (10% off)
                    </p>
                  )}
                </form>

                {/* Totals */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#6E4449]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#9A656B]">
                      <span>Atelier Privilege (10%)</span>
                      <span className="tabular-nums">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6E4449]">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#B68488]/20 font-semibold text-base text-[#5D2B31]">
                    <span>Total</span>
                    <span className="tabular-nums">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="w-full py-3.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-sm transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Shipping & Payment Form */}
        {step === 'shipping' && (
          <form
            onSubmit={handlePlaceOrder}
            className="flex-1 overflow-y-auto px-6 py-5 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-[#9A656B]/12 border border-[#9A656B]/35 text-xs text-[#5D2B31]">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Camille Laurent"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="camille@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(0917) 234-5678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="142 Legazpi St, Legazpi Village"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Makati"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1229"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#5D2B31] mb-2">
                  Payment Method
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Card', 'Cash on Delivery'] as const).map((method) => {
                    const active = paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#9A656B] text-white border-[#9A656B]'
                            : 'bg-white text-[#5D2B31] border-[#B68488]/30 hover:bg-[#F6E6E4]'
                        }`}
                      >
                        {method === 'Card' ? (
                          <CreditCard className="w-3.5 h-3.5" />
                        ) : (
                          <Truck className="w-3.5 h-3.5" />
                        )}
                        <span>{method}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#B68488]/20 space-y-3">
              <div className="flex justify-between text-sm font-semibold text-[#5D2B31]">
                <span>Order Total ({detailedItems.reduce((a, b) => a + b.quantity, 0)} pieces)</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-sm transition-colors cursor-pointer"
              >
                Place Order &middot; {formatPrice(total)}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Post-Order Confirmation Receipt */}
        {step === 'confirmed' && lastOrderReceipt && (
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#F2D9D7] text-[#9A656B] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium text-[#9A656B] mb-1">
                  Order {lastOrderReceipt.orderNumber} Confirmed &mdash; Preparing in Atelier
                </p>
                <h3 className="font-display text-2xl text-[#5D2B31] mb-1">
                  Thank you, {lastOrderReceipt.customerName}
                </h3>
                <p className="text-xs text-[#6E4449]">
                  Confirmation sent to {lastOrderReceipt.email} on {lastOrderReceipt.placedAt}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#B68488]/25 space-y-3 text-xs">
                <p className="font-medium text-[#5D2B31]">Atelier Receipt</p>
                <div className="space-y-2 border-b border-[#B68488]/15 pb-3">
                  {lastOrderReceipt.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between gap-2">
                      <div>
                        <p className="text-[#5D2B31] font-medium">
                          {item.name} &times; {item.quantity}
                        </p>
                        <p className="text-[#7D5257]">
                          {item.colorName} &middot; Size {item.size}
                        </p>
                      </div>
                      <span className="tabular-nums font-medium text-[#5D2B31]">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 text-[#6E4449]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(lastOrderReceipt.subtotal)}</span>
                  </div>
                  {lastOrderReceipt.discount > 0 && (
                    <div className="flex justify-between text-[#9A656B]">
                      <span>Discount</span>
                      <span className="tabular-nums">-{formatPrice(lastOrderReceipt.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="tabular-nums">
                      {lastOrderReceipt.shipping === 0
                        ? 'Complimentary'
                        : formatPrice(lastOrderReceipt.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#B68488]/15 font-semibold text-sm text-[#5D2B31]">
                    <span>Total Paid ({lastOrderReceipt.paymentMethod})</span>
                    <span className="tabular-nums">{formatPrice(lastOrderReceipt.total)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6E6E4]/70 border border-[#B68488]/20 text-xs text-[#5D2B31] space-y-1">
                <p className="font-medium">Shipping To</p>
                <p className="text-[#6E4449]">
                  {lastOrderReceipt.address}, {lastOrderReceipt.city}{' '}
                  {lastOrderReceipt.postalCode}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('bag');
                onClose();
              }}
              className="w-full py-3 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
