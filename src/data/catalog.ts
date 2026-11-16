import heroBoutiqueRack from '../assets/images/hero_boutique_rack_1794719061935.jpg';
import aboutSatinMannequin from '../assets/images/about_satin_mannequin_1794719062770.jpg';
import collectionHandbags from '../assets/images/collection_handbags_1794719062957.jpg';
import collectionPearls from '../assets/images/collection_pearls_1794719063161.jpg';
import storyRibbonEnvelope from '../assets/images/story_ribbon_envelope_1794719063812.jpg';
import dressBowCream from '../assets/images/dress_bow_cream_1794719064038.jpg';
import bagBlushClasp from '../assets/images/bag_blush_clasp_1794719064840.jpg';
import cardiganBowCream from '../assets/images/cardigan_bow_cream_1794719065105.jpg';
import earringsPearlBow from '../assets/images/earrings_pearl_bow_1794719065721.jpg';
import dressRoseMidi from '../assets/images/dress_rose_midi_1794719066033.jpg';
import dressChampagneSlip from '../assets/images/dress_champagne_slip_1794719065495.jpg';
import dressIvoryLace from '../assets/images/dress_ivory_lace_1794719067102.jpg';

export type CategoryType = 'All' | 'Clothing' | 'Accessories' | 'More';

export interface Colorway {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryType, 'All'>;
  subcategory: string;
  price: number;
  fabric: string;
  badge?: string;
  description: string;
  fitNotes: string;
  careInstructions: string;
  image: string;
  colorways: Colorway[];
  sizes: string[];
  isFeaturedFavorite: boolean;
}

export interface BagItem {
  productId: string;
  colorName: string;
  size: string;
  quantity: number;
}

export interface OrderReceipt {
  orderNumber: string;
  placedAt: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'Card' | 'Cash on Delivery';
  items: Array<{
    name: string;
    colorName: string;
    size: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export const EDITORIAL_MEDIA = {
  heroBoutiqueRack,
  aboutSatinMannequin,
  collectionHandbags,
  collectionPearls,
  storyRibbonEnvelope,
};

export const COLLECTION_GATEWAYS: Array<{
  category: Exclude<CategoryType, 'All'>;
  label: string;
  subtitle: string;
  image: string;
}> = [
  {
    category: 'Clothing',
    label: 'Clothing',
    subtitle: 'Satin gowns, chiffon midis & lace silhouettes',
    image: heroBoutiqueRack,
  },
  {
    category: 'Accessories',
    label: 'Accessories',
    subtitle: 'Structured calfskin bags & pearl hairpieces',
    image: collectionHandbags,
  },
  {
    category: 'More',
    label: 'More',
    subtitle: 'Bow knitwear, pearl bracelets & atelier gifts',
    image: collectionPearls,
  },
];

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'rosette-bow-dress',
    name: 'Rosette Satin-Bow Chiffon Dress',
    category: 'Clothing',
    subcategory: 'Tea & Midi Dresses',
    price: 198,
    fabric: '100% Silk Chiffon',
    badge: 'Signature Piece',
    description:
      'Floaty sweetheart tea-length dress with flutter ruffle sleeves, pleated waist, and a hand-tied ivory satin bow at the bodice.',
    fitNotes: 'True to size with a softly boned bodice and concealed side zip. Midi skirt grazes mid-calf.',
    careInstructions: 'Dry clean recommended or gentle cold hand wash inside a satin garment bag.',
    image: dressBowCream,
    colorways: [
      { name: 'Porcelain Cream', hex: '#F6EDE4' },
      { name: 'Petal Blush', hex: '#E8C5C4' },
      { name: 'Dusty Rose', hex: '#B47A80' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeaturedFavorite: true,
  },
  {
    id: 'camellia-rose-midi',
    name: 'Camellia Tie-Strap Silk Midi',
    category: 'Clothing',
    subcategory: 'Evening & Cocktail Dresses',
    price: 224,
    fabric: 'Mulberry Crêpe Silk',
    badge: 'New Arrival',
    description:
      'Tailored sweetheart bodice with delicate adjustable ribbon shoulder ties and a luminous, full-circle pleated A-line skirt.',
    fitNotes: 'Fitted through the bust and natural waist with generous flare at the hip.',
    careInstructions: 'Steam on low silk setting; dry clean only.',
    image: dressRoseMidi,
    colorways: [
      { name: 'Dusty Rose', hex: '#B47A80' },
      { name: 'Champagne Mist', hex: '#E3C7B8' },
      { name: 'Ivory Pearl', hex: '#F4ECE5' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeaturedFavorite: false,
  },
  {
    id: 'aurelia-champagne-slip',
    name: 'Aurelia Bias-Cut Satin Gown',
    category: 'Clothing',
    subcategory: 'Evening Silk Gowns',
    price: 268,
    fabric: 'Heavyweight Charmeuse Silk',
    badge: 'Small Batch',
    description:
      'Fluid bias-cut evening gown featuring a softly draped cowl neckline, fine roulette straps, and a gentle puddle hem.',
    fitNotes: 'Cut on the true bias to skim curves effortlessly without clinging.',
    careInstructions: 'Specialist silk dry clean only; store hung on padded satin hangers.',
    image: dressChampagneSlip,
    colorways: [
      { name: 'Warm Champagne', hex: '#DFBFA9' },
      { name: 'Rosewood', hex: '#A86D73' },
      { name: 'Cream Silk', hex: '#F5EDE4' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeaturedFavorite: false,
  },
  {
    id: 'amour-ivory-lace',
    name: 'Amour Eyelet Lace Garden Dress',
    category: 'Clothing',
    subcategory: 'Garden & Day Dresses',
    price: 176,
    fabric: 'Organic Cotton Guipure Lace',
    description:
      'Romantic puffed-sleeve midi dress crafted in breathable botanical lace, finished with a scalloped hem and blush velvet waist sash.',
    fitNotes: 'Relaxed A-line cut with softly elasticated puff cuffs and removable ribbon sash.',
    careInstructions: 'Hand wash cold; lay flat to dry away from direct sunlight.',
    image: dressIvoryLace,
    colorways: [
      { name: 'Antique Ivory', hex: '#F5EFE6' },
      { name: 'Blush Ribbon', hex: '#E6C2C1' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeaturedFavorite: false,
  },
  {
    id: 'coquette-blush-bag',
    name: 'Coquette Top-Handle Leather Bag',
    category: 'Accessories',
    subcategory: 'Leather Handbags',
    price: 215,
    fabric: 'Full-Grain Pebbled Calfskin',
    badge: 'Signature Piece',
    description:
      'Structured trapezoid top-handle bag with a brushed champagne-gold turn clasp, suede-lined interior, and detachable crossbody strap.',
    fitNotes: 'Dimensions: 23 cm × 17 cm × 9 cm. Fits phone, compact mirror, lipstick, and cardholder.',
    careInstructions: 'Wipe gently with a soft dry cloth and store upright inside its linen dust pouch.',
    image: bagBlushClasp,
    colorways: [
      { name: 'Petal Blush', hex: '#D8A2A4' },
      { name: 'Mauve Taupe', hex: '#A78488' },
      { name: 'Porcelain Ivory', hex: '#F3ECE5' },
    ],
    sizes: ['One Size'],
    isFeaturedFavorite: true,
  },
  {
    id: 'celeste-bow-cardigan',
    name: 'Céleste Pearl-Button Bow Cardigan',
    category: 'More',
    subcategory: 'Atelier Knitwear',
    price: 138,
    fabric: 'Merino & Cashmere Blend',
    badge: 'New Arrival',
    description:
      'Feather-soft cropped cable knit cardigan accented with faux-pearl buttons, scalloped crochet collar trim, and a blush satin ribbon tie.',
    fitNotes: 'Cropped waist-skimming silhouette designed to layer gracefully over tea dresses and slips.',
    careInstructions: 'Hand wash cool with wool detergent; dry flat on a clean towel.',
    image: cardiganBowCream,
    colorways: [
      { name: 'Vanilla Cream', hex: '#F6EFE6' },
      { name: 'Soft Rosewater', hex: '#EAC7C8' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeaturedFavorite: true,
  },
  {
    id: 'lumina-pearl-earrings',
    name: 'Lumina Freshwater Pearl Bow Drops',
    category: 'Accessories',
    subcategory: 'Fine Jewelry',
    price: 84,
    fabric: '18k Gold Vermeil & Freshwater Pearls',
    description:
      'Sculpted ribbon-bow studs paved with seed pearls and suspended luminous baroque freshwater pearl drops.',
    fitNotes: 'Lightweight 4.2 g per earring with secure butterfly backs for all-day comfort.',
    careInstructions: 'Keep dry and polish softly with the included microfiber jewelry cloth.',
    image: earringsPearlBow,
    colorways: [
      { name: 'Champagne Gold', hex: '#D6B78B' },
      { name: 'Rose Gold', hex: '#D9A7A2' },
    ],
    sizes: ['One Size'],
    isFeaturedFavorite: true,
  },
  {
    id: 'empress-pearl-bracelet',
    name: 'Clarisse Gold-Bow Pearl Bracelet',
    category: 'More',
    subcategory: 'Giftable Keepsakes',
    price: 112,
    fabric: 'Cultured Pearls & Brushed Gold',
    description:
      'Hand-knotted lustrous freshwater pearl strand anchored by a sculpted brushed-gold ribbon bow clasp with crystal pavé detail.',
    fitNotes: 'Adjustable 16.5 cm–18.5 cm wrist circumference; arrives in a ribbon-tied keepsake box.',
    careInstructions: 'Fasten after applying fragrance; wipe pearls lightly after wear.',
    image: collectionPearls,
    colorways: [
      { name: 'Ivory & Gold', hex: '#E5CEAC' },
    ],
    sizes: ['One Size'],
    isFeaturedFavorite: false,
  },
];

export const SIZE_GUIDE_ROWS = [
  { size: 'XS', us: '0–2', bust: '31.5–32.5"', waist: '24.5–25.5"', hips: '34.5–35.5"' },
  { size: 'S', us: '4–6', bust: '33.5–34.5"', waist: '26.5–27.5"', hips: '36.5–37.5"' },
  { size: 'M', us: '8–10', bust: '35.5–36.5"', waist: '28.5–29.5"', hips: '38.5–39.5"' },
  { size: 'L', us: '12–14', bust: '38–39.5"', waist: '31–32.5"', hips: '41–42.5"' },
];
