export interface HomeWishlistContentProps {
  Heading: string;
  Image: string;
  Category: string;
  Price: string;
}

export interface HomeCartContentProps {
  Heading: string;
  Image: string;
  Category: string;
  Price: string;
}

// Add some sample items to the shopping list
export const HomeWishlistContent: HomeWishlistContentProps[] = [
  {
    Heading: 'Denim Jacket - Classic Blue',
    Image:
      'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Fwoman-three.jpg?alt=media',
    Category: 'Outerwear',
    Price: '₹1999.00',
  },
  {
    Heading: 'Pleated Midi Skirt - Beige',
    Image:
      'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Fwoman-one.jpg?alt=media',
    Category: 'Bottom Wear',
    Price: '₹1499.00',
  },
];

export const HomeCartContent: HomeCartContentProps[] = [
  {
    Heading: 'Premium Cotton T-Shirt',
    Image:
      'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Fman-one.jpg?alt=media',
    Category: 'Top Wear',
    Price: '₹899.00',
  },
  {
    Heading: 'Leather Chelsea Boots',
    Image:
      'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Fman-two.jpg?alt=media',
    Category: 'Footwear',
    Price: '₹2499.00',
  },
];
