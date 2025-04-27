'use client';

import { useState, useEffect } from 'react';
import { Button, Tabs, Tab, Box } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  HeartIcon,
  StarIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import MintNFTButton from '../../components/nft/MintNFTButton';
import dynamic from 'next/dynamic';
import {
  DiscoverSliderContent,
  SummerSaleContent,
} from 'contents/home/discover/Home.Discover.Slider';
import { useToast } from 'context/ToastContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      className="py-4"
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

// Client-side only component
function DetailsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [tabValue, setTabValue] = useState(0);
  const [productImages, setProductImages] = useState({
    image1: '/images/placeholder.png',
    image2: '/images/placeholder.png',
    image3: '/images/placeholder.png',
  });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [productPrice, setProductPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');

  // Safely extract product parameter with null check
  const product = searchParams ? searchParams.get('product') ?? '' : '';

  // Function to convert product name to folder name
  const getProductFolderName = (productName: string) => {
    // Convert product name to match folder structure
    const folderNameMap: Record<string, string> = {
      'Denim Jacket - Classic Blue': 'denim-jacket',
      'Pleated Midi Skirt - Beige': 'pleatedmini-skirt',
      'Premium Cotton T-Shirt': 'premium-tshirt',
      'Leather Crossbody Bag': 'crossboy-bag',
      'Slim Fit Chino Pants': 'chinnopants',
      'Floral Print Summer Dress': 'floral-print-summer-dress',
      'Designer Sunglasses': 'sunglasses',
      'Leather Chelsea Boots': 'leather-chelsea-boots',
      'Cashmere Blend Sweater': 'blend-sweather',
      'Linen Blend Blazer': 'blend-blazer',
    };

    return (
      folderNameMap[productName] || productName.toLowerCase().replace(/ /g, '-')
    );
  };

  useEffect(() => {
    if (product) {
      // Find product in DiscoverSliderContent or SummerSaleContent
      const productInfo = [...DiscoverSliderContent, ...SummerSaleContent].find(
        (item) => item.Heading === product,
      );

      if (productInfo) {
        setProductPrice(productInfo.DiscountedPrice);
        setOriginalPrice(productInfo.OriginalPrice);
        setDiscount(productInfo.Discount);
      } else {
        // Fallback if product not found in arrays
        setProductPrice('1999.00');
        setOriginalPrice('2599.00');
        setDiscount('-30%');
      }

      const folderName = getProductFolderName(product);
      const defaultImage = `/images/avatar/products/${folderName}.jpg`;
      const placeholderImage = '/images/placeholder.png';

      // For blend sweater and blend blazer, use only the main product image
      if (
        product === 'Cashmere Blend Sweater' ||
        product === 'Linen Blend Blazer'
      ) {
        setProductImages({
          image1: defaultImage || placeholderImage,
          image2: defaultImage || placeholderImage,
          image3: defaultImage || placeholderImage,
        });
      } else {
        // For other products, try to load specific detail images
        const image1 = `/images/avatar/products/${folderName}/1.jpg`;
        const image2 = `/images/avatar/products/${folderName}/2.jpg`;
        const image3 = `/images/avatar/products/${folderName}/3.jpg`;

        setProductImages({
          image1: image1 || defaultImage || placeholderImage,
          image2: image2 || defaultImage || placeholderImage,
          image3: image3 || defaultImage || placeholderImage,
        });
      }

      setImagesLoaded(true);
    }
  }, [product]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle image loading error
  const handleImageError = (index: number) => {
    setProductImages((prev) => {
      const fallbackImage = `/images/avatar/products/${getProductFolderName(
        product,
      )}.jpg`;
      const placeholderImage = '/images/placeholder.png';

      if (index === 1) {
        return { ...prev, image1: fallbackImage || placeholderImage };
      } else if (index === 2) {
        return { ...prev, image2: fallbackImage || placeholderImage };
      } else if (index === 3) {
        return { ...prev, image3: fallbackImage || placeholderImage };
      }
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart in localStorage
      const newItem = {
        Heading: product,
        Image: productImages.image1,
        Category: 'Product',
        Price: `₹${productPrice}`,
      };

      try {
        // Get existing cart items
        const existingCartItemsJSON = localStorage.getItem('cartItems');
        const cartItems = existingCartItemsJSON
          ? JSON.parse(existingCartItemsJSON)
          : [];

        // Check if the product is already in the cart
        if (
          !cartItems.some(
            (item: { Heading: string }) => item.Heading === product,
          )
        ) {
          cartItems.push(newItem);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));

          // Show success toast notification
          showToast(
            'Success',
            'Added to Cart',
            `${product} has been added to your cart.`,
          );
        } else {
          // Item already in cart
          showToast(
            'Info',
            'Already in Cart',
            `${product} is already in your cart.`,
          );
        }
      } catch (e) {
        console.error('Failed to add item to cart:', e);
        showToast(
          'Error',
          'Failed to Add Item',
          'There was an error adding this item to your cart.',
        );
      }
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      // Add the product to wishlist in localStorage
      const newItem = {
        Heading: product,
        Image: productImages.image1,
        Category: 'Product',
        Price: `₹${productPrice}`,
      };

      try {
        // Get existing wishlist items
        const existingWishlistItemsJSON = localStorage.getItem('wishlistItems');
        const wishlistItems = existingWishlistItemsJSON
          ? JSON.parse(existingWishlistItemsJSON)
          : [];

        // Check if the product is already in the wishlist
        if (
          !wishlistItems.some(
            (item: { Heading: string }) => item.Heading === product,
          )
        ) {
          wishlistItems.push(newItem);
          localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

          // Show success toast notification
          showToast(
            'Success',
            'Added to Wishlist',
            `${product} has been added to your wishlist.`,
          );
        } else {
          // Item already in wishlist
          showToast(
            'Info',
            'Already in Wishlist',
            `${product} is already in your wishlist.`,
          );
        }
      } catch (e) {
        console.error('Failed to add item to wishlist:', e);
        showToast(
          'Error',
          'Failed to Add Item',
          'There was an error adding this item to your wishlist.',
        );
      }
    }
  };

  const handleOrderNow = () => {
    if (product) {
      // Add the product to cart in localStorage
      const newItem = {
        Heading: product,
        Image: productImages.image1,
        Category: 'Product',
        Price: `₹${productPrice}`,
      };

      try {
        // Get existing cart items
        const existingCartItemsJSON = localStorage.getItem('cartItems');
        const cartItems = existingCartItemsJSON
          ? JSON.parse(existingCartItemsJSON)
          : [];

        // Check if the product is already in the cart
        if (
          !cartItems.some(
            (item: { Heading: string }) => item.Heading === product,
          )
        ) {
          cartItems.push(newItem);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        showToast(
          'Success',
          'Proceeding to Checkout',
          'Taking you to checkout...',
        );
        // Navigate directly to checkout
        router.push('/checkout');
      } catch (e) {
        console.error('Failed to process order:', e);
        showToast(
          'Error',
          'Order Processing Failed',
          'There was an error processing your order.',
        );
      }
    }
  };

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-7xl py-6">
          <div className="flex flex-col px-4">
            {/* Back button */}
            <Button
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={() => router.back()}
              className="mb-6 self-start text-white hover:bg-[#ffffff20]"
            >
              Back
            </Button>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Image gallery section */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-lg">
                    {imagesLoaded && (
                      <Image
                        src={productImages.image1}
                        alt={product}
                        className="h-full w-full object-cover object-center"
                        width={800}
                        height={600}
                        onError={() => handleImageError(1)}
                      />
                    )}
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    {imagesLoaded && (
                      <Image
                        src={productImages.image2}
                        alt={`${product} detail 1`}
                        className="h-full w-full object-cover object-center"
                        width={400}
                        height={400}
                        onError={() => handleImageError(2)}
                      />
                    )}
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    {imagesLoaded && (
                      <Image
                        src={productImages.image3}
                        alt={`${product} detail 2`}
                        className="h-full w-full object-cover object-center"
                        width={400}
                        height={400}
                        onError={() => handleImageError(3)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Product details section */}
              <div className="flex flex-col space-y-6 text-white lg:col-span-5">
                <div>
                  <h1 className="text-3xl font-bold">{product}</h1>
                  <div className="mt-4 flex items-center space-x-4">
                    <span className="text-2xl font-semibold">
                      ₹{productPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{originalPrice}
                    </span>
                    <span className="rounded-md bg-green-800 px-2 py-1 text-sm font-medium">
                      {discount}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < 4
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      (24 reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Collection</h2>
                  <p className="text-gray-300">
                    The {product} is part of our premium collection, designed
                    for those who appreciate quality and style. This piece
                    embodies the perfect blend of comfort and fashion.
                  </p>
                </div>

                {/* Base NFT section */}
                <div className="space-y-4 rounded-lg bg-gradient-to-r from-[#0052FF20] to-[#00A3FF20] p-4">
                  <div className="flex items-center space-x-2">
                    <img src="/base-logo.svg" alt="Base" className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">
                      Available as Digital Fashion NFT
                    </h2>
                  </div>
                  <p className="text-gray-300">
                    Own this exclusive digital version of the {product} as an
                    NFT on Base blockchain. Wear it in virtual worlds and
                    showcase in your digital wardrobe.
                  </p>
                  <Button
                    variant="text"
                    className="mt-2 text-[#0052FF] hover:bg-[#0052FF10]"
                    onClick={() => router.push('/collection')}
                  >
                    View Your Collection
                  </Button>
                </div>

                <Box
                  sx={{
                    width: '100%',
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="product information tabs"
                    className="text-white"
                    sx={{
                      '& .MuiTab-root': { color: '#ffffff80' },
                      '& .Mui-selected': { color: '#ffffff' },
                      '& .MuiTabs-indicator': { backgroundColor: '#ffffff' },
                    }}
                  >
                    <Tab
                      label="Details"
                      id="product-tab-0"
                      aria-controls="product-tabpanel-0"
                    />
                    <Tab
                      label="Care"
                      id="product-tab-1"
                      aria-controls="product-tabpanel-1"
                    />
                    <Tab
                      label="Shipping"
                      id="product-tab-2"
                      aria-controls="product-tabpanel-2"
                    />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                  <ul className="list-inside list-disc space-y-2 text-gray-300">
                    <li>Premium quality material</li>
                    <li>Thoughtfully designed for comfort</li>
                    <li>Versatile styling options</li>
                    <li>Exclusive limited edition design</li>
                    <li>Available in multiple sizes</li>
                  </ul>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <p className="text-gray-300">
                    Hand wash with cold water. Do not bleach. Hang to dry. Iron
                    on low temperature if needed. Store in a cool, dry place.
                  </p>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <p className="text-gray-300">
                    Free standard shipping on all orders. Express delivery
                    available for an additional charge. International shipping
                    options available. Returns accepted within 14 days of
                    delivery.
                  </p>
                </TabPanel>

                <div className="mt-8 flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button
                    variant="contained"
                    startIcon={<BoltIcon className="h-5 w-5" />}
                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-500 py-3 text-[13px] font-[600] tracking-wider text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                    sx={{
                      textTransform: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::after': {
                        opacity: 1,
                      },
                    }}
                    onClick={handleOrderNow}
                  >
                    ORDER NOW
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingBagIcon className="h-5 w-5" />}
                    className="relative overflow-hidden rounded-lg bg-white py-3 text-[13px] font-[600] tracking-wider text-black shadow-md transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg"
                    sx={{
                      textTransform: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.05)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::after': {
                        opacity: 1,
                      },
                    }}
                    onClick={handleAddToCart}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<HeartIcon className="h-5 w-5" />}
                    className="rounded-lg border-2 border-white/30 py-3 text-[13px] font-[600] tracking-wider text-white backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/70 hover:bg-white/10"
                    sx={{
                      textTransform: 'none',
                    }}
                    onClick={handleAddToWishlist}
                  >
                    WISHLIST
                  </Button>
                  <MintNFTButton
                    productName={product}
                    productImage={
                      productImages.image1 !== '/images/placeholder.png'
                        ? productImages.image1
                        : null
                    }
                    productDescription={`Digital version of ${product} for virtual worlds`}
                    price="0.01"
                    className="rounded-lg py-3 shadow-md transition-all duration-200 ease-in-out hover:shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}

// Use dynamic import with ssr: false to prevent hydration errors
const DetailsPage = dynamic(() => Promise.resolve(DetailsPageContent), {
  ssr: false,
  loading: () => (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto flex h-screen max-w-7xl items-center justify-center py-6">
          <div className="text-center text-white">
            <div className="mb-4 text-2xl font-bold">
              Loading product details...
            </div>
            <div className="text-white/70">
              Please wait while we fetch the product information
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  ),
});

export default DetailsPage;
