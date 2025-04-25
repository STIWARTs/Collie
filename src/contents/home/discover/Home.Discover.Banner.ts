export interface DiscoverBannerFiveContentProps {
  Heading: string;
  Description: string;
  Image: string;
  slug: string;
}

export interface DiscoverBannerFourContentProps {
  Heading: string;
  Description: string;
  Image: string;
  slug: string;
}

export interface DiscoverBannerLightingDealContentProps {
  Heading: string;
  Description: string;
  Image: string;
  OriginalPrice: string;
  DiscountedPrice: string;
  Available: boolean;
  slug: string;
  Color: string;
}

export interface DiscoverBannerTop5ContentProps {
  Color: string;
  Heading: string;
  Image: string;
}

export const DiscoverBannerFiveContent = [
  {
    Heading: 'Free Express Shipping',
    Description:
      'Get free express shipping on all orders above ₹1999. Receive your items within 2-3 business days.',
    Image: '/images/avatar/illustration/5.png',
    slug: 'express-shipping',
  },
  {
    Heading: 'Personalized Styling',
    Description:
      'Schedule a virtual consultation with our professional stylists to create your perfect wardrobe.',
    Image: '/images/avatar/illustration/6.png',
    slug: 'personalized-styling',
  },
  {
    Heading: 'Easy Returns & Exchanges',
    Description:
      'Hassle-free returns within 30 days. We will pick up your returns for free from your doorstep.',
    Image: '/images/avatar/illustration/7.png',
    slug: 'easy-returns',
  },
  {
    Heading: 'Loyalty Rewards Program',
    Description:
      'Earn points with every purchase and redeem them for exclusive discounts, early access to sales, and more.',
    Image: '/images/avatar/illustration/4.png',
    slug: 'loyalty-rewards',
  },
  {
    Heading: 'Sustainable Packaging',
    Description:
      'All our shipments use 100% recyclable materials as part of our commitment to environmental responsibility.',
    Image: '/images/avatar/illustration/10.png',
    slug: 'sustainable-packaging',
  },
];

export const DiscoverBannerFourContent = [
  {
    Heading: 'Summer Collection 2025',
    Description:
      'Discover our breathtaking summer essentials featuring lightweight fabrics, vibrant colors, and breezy silhouettes perfect for the season.',
    Image: '/images/avatar/illustration/9.png',
    slug: 'summer-collection-2025',
  },
  {
    Heading: 'Exclusive Designer Collaborations',
    Description:
      'Shop our limited-edition pieces from collaborations with world-renowned designers bringing high fashion to everyday wear.',
    Image: '/images/avatar/illustration/10.png',
    slug: 'designer-collaborations',
  },
  {
    Heading: 'Sustainable Fashion Initiative',
    Description:
      'Join our commitment to eco-friendly fashion with our collection made from recycled materials and ethically sourced fabrics.',
    Image: '/images/avatar/illustration/7.png',
    slug: 'sustainable-fashion',
  },
  {
    Heading: 'Personal Styling Services',
    Description:
      'Elevate your wardrobe with our personalized styling consultations, tailored to your unique style preferences and body type.',
    Image: '/images/avatar/illustration/8.png',
    slug: 'personal-styling',
  },
];

export const DiscoverBannerDealContent = [
  {
    Heading: 'Designer Handbag Sale',
    Description: 'Offers are valid till 20th August',
    OriginalPrice: '4999.00',
    DiscountedPrice: '2499.00',
    Available: true,
    Image: '/images/avatar/illustration/faga.png',
    slug: 'designer-handbag-sale',
    Color: 'dark-red',
  },
  {
    Heading: 'Premium Denim Collection',
    Description: 'Offers are valid till 20th August',
    OriginalPrice: '2999.00',
    DiscountedPrice: '1799.00',
    Available: true,
    Image: '/images/avatar/illustration/fasfaf.png',
    slug: 'premium-denim-collection',
    Color: 'dark-green',
  },
  {
    Heading: 'Luxury Watches',
    Description: 'Offers are valid till 20th August',
    OriginalPrice: '12999.00',
    DiscountedPrice: '8999.00',
    Available: false,
    Image: '/images/avatar/illustration/gsadfga.png',
    slug: 'luxury-watches',
    Color: 'dark-blue',
  },
  {
    Heading: 'Athletic Wear Set',
    Description: 'Offers are valid till 20th August',
    OriginalPrice: '3999.00',
    DiscountedPrice: '2299.00',
    Available: true,
    Image: '/images/avatar/illustration/2.png',
    slug: 'athletic-wear-set',
    Color: 'dark-orange',
  },
  {
    Heading: 'Summer Footwear Collection',
    Description: 'Offers are valid till 20th August',
    OriginalPrice: '2499.00',
    DiscountedPrice: '1499.00',
    Available: false,
    Image: '/images/avatar/illustration/6.png',
    slug: 'summer-footwear-collection',
    Color: 'dark-pink',
  },
];

export const DiscoverBannerTop5Content = [
  {
    Color: 'dark-orange',
    Heading: 'Oversized Blazers',
    Image: '/images/avatar/illustration/gsgs.png',
  },
  {
    Color: 'dark-green',
    Heading: 'Sustainable Activewear',
    Image: '/images/avatar/illustration/vzsf.png',
  },
  {
    Color: 'dark-red',
    Heading: 'Statement Accessories',
    Image: '/images/avatar/illustration/zzgzds.png',
  },
  {
    Color: 'dark-blue',
    Heading: 'Vintage-Inspired Denim',
    Image: '/images/avatar/illustration/fasf.png',
  },
  {
    Color: 'dark-pink',
    Heading: 'Minimalist Essentials',
    Image: '/images/avatar/illustration/fasfaf.png',
  },
];
