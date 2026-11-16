import React, { useMemo, useState } from 'react';
import { Check, MessageSquareHeart, Star, ThumbsUp } from 'lucide-react';
import { Product } from '../data/catalog';
import { Review } from '../data/reviews';
import { BowDivider } from './Ornaments';
import { ScrollReveal } from './ScrollReveal';

interface ReviewsSectionProps {
  reviews: Review[];
  products: Product[];
  helpfulIds: string[];
  onToggleHelpful: (reviewId: string) => void;
  onSubmitReview: (input: {
    productId: string | 'boutique';
    authorName: string;
    rating: number;
    title: string;
    comment: string;
  }) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Needs Care',
  2: 'Fair',
  3: 'Lovely',
  4: 'Very Elegant',
  5: 'Adored It',
};

export function ReviewsSection({
  reviews,
  products,
  helpfulIds,
  onToggleHelpful,
  onSubmitReview,
}: ReviewsSectionProps) {
  const [filterProductId, setFilterProductId] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>('boutique');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const summary = useMemo(() => {
    if (reviews.length === 0) {
      return { average: 0, total: 0, counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    for (const r of reviews) {
      sum += r.rating;
      counts[r.rating] = (counts[r.rating] || 0) + 1;
    }
    return {
      average: Number((sum / reviews.length).toFixed(1)),
      total: reviews.length,
      counts,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (filterProductId === 'all') return reviews;
    return reviews.filter((r) => r.productId === filterProductId);
  }, [reviews, filterProductId]);

  const getProductName = (productId: string) => {
    if (productId === 'boutique') return 'Boutique Experience';
    return products.find((p) => p.id === productId)?.name || 'Atelier Piece';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      setFormError('Please share your name and a brief note before posting.');
      return;
    }
    onSubmitReview({
      productId: selectedProductId,
      authorName: authorName.trim(),
      rating,
      title: title.trim() || RATING_LABELS[rating],
      comment: comment.trim(),
    });
    setAuthorName('');
    setTitle('');
    setComment('');
    setRating(5);
    setFormError('');
    setSubmittedNotice(true);
    setIsFormOpen(false);
    window.setTimeout(() => setSubmittedNotice(false), 3500);
  };

  const activeStarValue = hoverRating || rating;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden silk-band-soft py-16 sm:py-24 border-t border-white/50"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Heading */}
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <BowDivider className="mb-4 max-w-[380px]" />
          <h2 className="font-display text-3xl sm:text-4xl text-[#6D3239] font-normal mb-2">
            Client Notes &amp; Reviews
          </h2>
          <p className="text-sm sm:text-base text-[#6E4449]">
            Reflections from women wearing Elarion&rsquo;s Finery.
          </p>
        </ScrollReveal>

        {/* Rating Summary + Filter Bar */}
        <ScrollReveal delay={0.06}>
          <div className="bg-[#FDF7F6] rounded-3xl border border-[#B68488]/25 p-6 sm:p-8 shadow-[0_8px_24px_rgba(110,53,59,0.06)] mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Overall Score */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4 lg:border-r lg:border-[#B68488]/20 lg:pr-6">
                <div>
                  <p className="font-display text-5xl text-[#5D2B31] font-medium tabular-nums leading-none mb-2">
                    {summary.average.toFixed(1)}
                  </p>
                  <div
                    className="flex items-center justify-center sm:justify-start lg:justify-center gap-1 mb-1.5"
                    aria-label={`Average rating ${summary.average} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(summary.average)
                            ? 'fill-[#9A656B] text-[#9A656B]'
                            : 'text-[#B68488]/40'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#7D5257] tabular-nums">
                    Based on {summary.total} verified boutique notes
                  </p>
                </div>
              </div>

              {/* Center: Star Breakdown */}
              <div className="lg:col-span-5 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = summary.counts[star] || 0;
                  const pct =
                    summary.total > 0
                      ? Math.round((count / summary.total) * 100)
                      : 0;
                  return (
                    <div
                      key={star}
                      className="flex items-center gap-3 text-xs text-[#5D2B31] tabular-nums"
                    >
                      <span className="w-8 text-right font-medium">
                        {star} ★
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-[#F2DFDD] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#9A656B] transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-[#7D5257]">{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right: Leave Feedback CTA & Piece Filter */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-sm font-medium shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>{isFormOpen ? 'Close Form' : 'Share Your Feedback'}</span>
                </button>

                <select
                  value={filterProductId}
                  onChange={(e) => setFilterProductId(e.target.value)}
                  aria-label="Filter reviews by piece"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-xs text-[#4E2A2E] focus:outline-none focus:ring-2 focus:ring-[#9A656B] cursor-pointer"
                >
                  <option value="all">All Pieces ({reviews.length})</option>
                  <option value="boutique">Boutique Experience</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {submittedNotice && (
              <div className="mt-5 p-3.5 rounded-2xl bg-[#F6E6E4] border border-[#B68488]/30 flex items-center justify-center gap-2 text-xs font-medium text-[#5D2B31]">
                <Check className="w-4 h-4 text-[#9A656B]" />
                <span>Thank you! Your review has been added to Elarion&rsquo;s Finery.</span>
              </div>
            )}

            {/* Expandable Feedback Form */}
            {isFormOpen && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 pt-6 border-t border-[#B68488]/20 grid grid-cols-1 md:grid-cols-12 gap-4"
              >
                <div className="md:col-span-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-xl text-[#5D2B31]">
                      Leave a Boutique Review
                    </p>
                    <p className="text-xs text-[#7D5257]">
                      Share how your piece fits, feels, or styled for your occasion.
                    </p>
                  </div>

                  {/* Interactive Star Picker */}
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-1"
                      role="radiogroup"
                      aria-label="Select star rating"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                          className="p-1 cursor-pointer transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A656B] rounded"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= activeStarValue
                                ? 'fill-[#9A656B] text-[#9A656B]'
                                : 'text-[#B68488]/45'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#6D3239] min-w-20">
                      {RATING_LABELS[activeStarValue]}
                    </span>
                  </div>
                </div>

                {formError && (
                  <div className="md:col-span-12 p-3 rounded-xl bg-[#9A656B]/12 border border-[#9A656B]/30 text-xs text-[#5D2B31]">
                    {formError}
                  </div>
                )}

                <div className="md:col-span-4">
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Clarisse Aquino"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Piece Reviewed
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B] cursor-pointer"
                  >
                    <option value="boutique">Overall Boutique Experience</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Short Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Dreamy satin drape"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>

                <div className="md:col-span-12">
                  <label className="block text-xs font-medium text-[#5D2B31] mb-1">
                    Your Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell other shoppers about the fit, fabric feel, or packaging..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B68488]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A656B]"
                  />
                </div>

                <div className="md:col-span-12 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#B68488]/35 text-xs font-medium text-[#5D2B31] hover:bg-[#F3DFDD] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#9A656B] hover:bg-[#825056] text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Review Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-[#FDF7F6] border border-[#B68488]/25 rounded-2xl p-10 text-center">
            <p className="font-display text-xl text-[#5D2B31] mb-2">
              No reviews for this piece yet
            </p>
            <p className="text-sm text-[#6E4449] mb-4">
              Be the first to share your thoughts on {getProductName(filterProductId)}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedProductId(
                  filterProductId === 'all' ? 'boutique' : filterProductId
                );
                setIsFormOpen(true);
              }}
              className="px-6 py-2.5 rounded-full bg-[#9A656B] text-white text-xs font-medium hover:bg-[#825056] cursor-pointer"
            >
              Write the First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, idx) => {
              const isHelpful = helpfulIds.includes(review.id);
              const displayHelpfulCount =
                review.helpfulCount + (isHelpful ? 1 : 0);

              return (
                <ScrollReveal key={review.id} delay={Math.min(idx * 0.05, 0.2)}>
                  <article className="h-full flex flex-col justify-between bg-[#FDF7F6] rounded-2xl border border-[#B68488]/20 p-6 shadow-[0_6px_18px_rgba(110,53,59,0.06)]">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div
                          className="flex items-center gap-0.5"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= review.rating
                                  ? 'fill-[#9A656B] text-[#9A656B]'
                                  : 'text-[#B68488]/35'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#7D5257]">
                          {review.createdAt}
                        </span>
                      </div>

                      <h3 className="font-display text-lg text-[#5D2B31] font-medium mb-1.5">
                        {review.title}
                      </h3>

                      <p className="text-xs text-[#9A656B] mb-3">
                        {getProductName(review.productId)}
                      </p>

                      <p className="text-sm leading-relaxed text-[#4E2A2E] mb-5">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#B68488]/15 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#5D2B31]">
                        {review.authorName}
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleHelpful(review.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                          isHelpful
                            ? 'bg-[#9A656B] text-white'
                            : 'bg-[#F3DFDD]/70 text-[#5D2B31] hover:bg-[#EAD0CD]'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful</span>
                        <span className="tabular-nums">({displayHelpfulCount})</span>
                      </button>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
