export interface DiscoverCarouselContentProps {
  Button: string;
  HeadingLine1: string;
  HeadingLine2?: string;
  HeadingLine3?: string;
  DescriptionLine1: string;
  DescriptionLine2?: string;
  DescriptionLine3?: string;
  OriginalPrice: string;
  DiscountedPrice: string;
  Color: string;
  ColorDark: string;
  Image: string;
}

// Only 10 Content will show (not more than 10 - not less than 10)
export const DiscoverCarouselContent = [
  {
    Color: 'dark-blue', // dark-blue
    ColorDark: 'super-dark-blue', // super-dark-blue
    Button: 'Order now',
    HeadingLine1: 'New Arrivals',
    HeadingLine2: 'Collection',
    DescriptionLine1: 'Fresh styles just dropped – be the first to wear them!',
    DescriptionLine2:
      'Explore our latest clothing items and stay ahead of the fashion curve.',
    OriginalPrice: '2999.00',
    DiscountedPrice: '1999.00',
    Image: '/images/avatar/illustration/1.png',
  },
  {
    Color: 'dark-pink', // dark-pink
    ColorDark: 'super-dark-pink', // super-dark-pink
    Button: 'See details',
    HeadingLine1: "Women's",
    HeadingLine2: 'Collection',
    DescriptionLine1:
      "Bold, chic, and made to move – explore the new women's line.",
    DescriptionLine2:
      'Featuring elegant dresses, stylish tops, and trendy skirts.',
    OriginalPrice: '1899.00',
    DiscountedPrice: '1299.00',
    Image: '/images/avatar/illustration/2.png',
  },
  {
    Color: 'dark-blue', // dark-blue
    ColorDark: 'super-dark-blue', // super-dark-blue
    Button: 'See details',
    HeadingLine1: "Men's",
    HeadingLine2: 'Collection',
    DescriptionLine1: "Classic looks, modern edge – shop the men's edit.",
    DescriptionLine2:
      'From casual shirts to formal wear, find your perfect fit.',
    OriginalPrice: '1799.00',
    DiscountedPrice: '1399.00',
    Image: '/images/avatar/illustration/3.png',
  },
  {
    Color: 'dark-green', // dark-green
    ColorDark: 'super-dark-green', // super-dark-green
    Button: 'Order now',
    HeadingLine1: 'Kidswear',
    HeadingLine2: 'Collection',
    DescriptionLine1: 'For little trendsetters – style starts young!',
    DescriptionLine2:
      'Vibrant, playful, and comfortable clothes for children of all ages.',
    OriginalPrice: '1299.00',
    DiscountedPrice: '799.00',
    Image: '/images/avatar/illustration/4.png',
  },
  {
    Color: 'dark-yellow', // dark-yellow
    ColorDark: 'super-dark-yellow', // super-dark-yellow
    Button: 'See details',
    HeadingLine1: 'Seasonal',
    HeadingLine2: 'Picks',
    DescriptionLine1: 'Stay cool this summer with breezy essentials.',
    DescriptionLine2:
      'Discover clothing ideal for the current season and refresh your wardrobe.',
    OriginalPrice: '1599.00',
    DiscountedPrice: '999.00',
    Image: '/images/avatar/illustration/5.png',
  },
  {
    Color: 'dark-red', // dark-red
    ColorDark: 'super-dark-red', // super-dark-red
    Button: 'Order now',
    HeadingLine1: 'Footwear',
    HeadingLine2: 'Collection',
    DescriptionLine1: 'Step into comfort and style – one pair at a time.',
    DescriptionLine2:
      'Explore our range of shoes, sneakers, heels, and boots for every occasion.',
    OriginalPrice: '2199.00',
    DiscountedPrice: '1499.00',
    Image: '/images/avatar/illustration/6.png',
  },
  {
    Color: 'dark-green', // dark-green
    ColorDark: 'super-dark-green', // super-dark-green
    Button: 'Order now',
    HeadingLine1: 'Accessories',
    HeadingLine2: 'Collection',
    DescriptionLine1: 'Complete the look with the perfect accessory.',
    DescriptionLine2:
      'Browse our collection of bags, belts, scarves, and jewelry to elevate any outfit.',
    OriginalPrice: '999.00',
    DiscountedPrice: '699.00',
    Image: '/images/avatar/illustration/7.png',
  },
  {
    Color: 'dark-blue', // dark-blue
    ColorDark: 'super-dark-blue', // super-dark-blue
    Button: 'Order now',
    HeadingLine1: 'Best',
    HeadingLine2: 'Sellers',
    DescriptionLine1: 'Loved by all – these pieces fly off the shelves!',
    DescriptionLine2:
      'Discover our top-selling items that have won hearts across the country.',
    OriginalPrice: '1799.00',
    DiscountedPrice: '1299.00',
    Image: '/images/avatar/illustration/8.png',
  },
  {
    Color: 'dark-pink', // dark-pink
    ColorDark: 'super-dark-pink', // super-dark-pink
    Button: 'See details',
    HeadingLine1: 'Trending',
    HeadingLine2: 'Now',
    DescriptionLine1: 'As seen on Insta – trending pieces just for you!',
    DescriptionLine2:
      'Shop the latest fashion items that are making waves on social media.',
    OriginalPrice: '1899.00',
    DiscountedPrice: '1499.00',
    Image: '/images/avatar/illustration/9.png',
  },
  {
    Color: 'dark-red', // dark-red
    ColorDark: 'super-dark-red', // super-dark-red
    Button: 'Order now',
    HeadingLine1: 'Sale &',
    HeadingLine2: 'Offers',
    DescriptionLine1: 'Deals too good to miss – up to 50% off!',
    DescriptionLine2:
      'Limited-time offers on premium clothing items and accessories.',
    OriginalPrice: '2499.00',
    DiscountedPrice: '1249.00',
    Image: '/images/avatar/illustration/10.png',
  },
];
