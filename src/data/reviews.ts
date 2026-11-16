export interface Review {
  id: string;
  productId: string | 'boutique';
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpfulCount: number;
}

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'rosette-bow-dress',
    authorName: 'Camille Soriano',
    rating: 5,
    title: 'Drape feels like spun air',
    comment:
      'Wore the Rosette Chiffon Dress to my sister’s garden tea and the satin bow held its shape all afternoon. True to size at the waist with zero tugging.',
    createdAt: 'November 12, 2026',
    helpfulCount: 14,
  },
  {
    id: 'rev-2',
    productId: 'camellia-rose-midi',
    authorName: 'Bianca Mendoza',
    rating: 5,
    title: 'The dusty rose shade is breathtaking',
    comment:
      'Mulberry silk feels substantial rather than sheer, and the adjustable shoulder ribbons let me customize the sweetheart neckline effortlessly.',
    createdAt: 'November 10, 2026',
    helpfulCount: 9,
  },
  {
    id: 'rev-3',
    productId: 'coquette-blush-bag',
    authorName: 'Hannah Reyes',
    rating: 5,
    title: 'Structured and surprisingly roomy',
    comment:
      'Fits my phone, compact powder, keys, and cardholder without losing its crisp silhouette. The brushed gold clasp clicks shut smoothly.',
    createdAt: 'November 8, 2026',
    helpfulCount: 11,
  },
  {
    id: 'rev-4',
    productId: 'celeste-bow-cardigan',
    authorName: 'Sofia Villanueva',
    rating: 4,
    title: 'Softest layer over slip dresses',
    comment:
      'The pearl buttons and ribbon collar make a simple dinner outfit look thoughtfully styled. Hand-washed gently once and it stayed plush.',
    createdAt: 'November 6, 2026',
    helpfulCount: 6,
  },
  {
    id: 'rev-5',
    productId: 'aurelia-champagne-slip',
    authorName: 'Isabel Tan',
    rating: 5,
    title: 'Effortless evening movement',
    comment:
      'Bias cut skims smoothly without clinging, and the champagne sheen looks warm under candlelit reception lighting.',
    createdAt: 'November 4, 2026',
    helpfulCount: 8,
  },
  {
    id: 'rev-6',
    productId: 'lumina-pearl-earrings',
    authorName: 'Patricia Lim',
    rating: 5,
    title: 'Feather-light pearl drops',
    comment:
      'Expected these to feel heavy after a few hours, but they stayed comfortable through an entire evening ceremony.',
    createdAt: 'November 2, 2026',
    helpfulCount: 5,
  },
];

export function getProductRatingSummary(
  reviews: Review[],
  productId: string
): { average: number; count: number } {
  const matching = reviews.filter((r) => r.productId === productId);
  if (matching.length === 0) {
    return { average: 0, count: 0 };
  }
  const sum = matching.reduce((acc, item) => acc + item.rating, 0);
  return {
    average: Number((sum / matching.length).toFixed(1)),
    count: matching.length,
  };
}
