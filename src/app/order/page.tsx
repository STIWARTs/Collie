'use client';

import { useState, useEffect } from 'react';
import { Button, Stack, Box, Container } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  DiscoverSliderContent,
  SummerSaleContent,
} from 'contents/home/discover/Home.Discover.Slider';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

function getProductFolderName(productName: string): string {
  // Convert product name to lowercase and replace spaces with hyphens
  return productName.toLowerCase().replace(/\s+/g, '-');
}

function OrderPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [productImage, setProductImage] = useState('/images/placeholder.png');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [productPrice, setProductPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState('');

  // Get product name from URL parameters
  const product = searchParams ? searchParams.get('product') ?? '' : '';
  const price = searchParams ? searchParams.get('price') ?? '' : '';
  const image = searchParams ? searchParams.get('image') ?? '' : '';

  // Get cartItems from localStorage on component mount
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

      // Load product image
      const folderName = getProductFolderName(product);
      const productImagePath = `/assets/products/${folderName}/image1.jpg`;

      setProductImage(productImagePath);
    }

    // Get cartItems from localStorage on component mount
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [product]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (!product || !price || !image) {
      setError('Product information is missing.');
      return;
    }

    const newItem: CartItem = {
      id: product,
      name: product,
      price: parseFloat(price),
      quantity: quantity,
      image: image,
    };

    // Check if item already exists in cart
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (item) => item.id === newItem.id,
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      updatedCartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      updatedCartItems.push(newItem);
    }

    // Save to state and localStorage
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Show success feedback
    alert('Added to cart!');
  };

  const handleCheckout = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleGoBack = () => {
    router.back();
  };

  const totalPrice = productPrice
    ? (parseFloat(productPrice) * quantity).toFixed(2)
    : '0.00';

  // If product is empty, show an error
  if (!product || !price || !image) {
    return (
      <HomeAndGalleryParentLayout>
        <HomeAndGalleryChildLayout>
          <Container maxWidth="md" className="py-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-2xl font-bold text-red-500">Error</h1>
              <p className="text-gray-300">No product specified.</p>
              <Button
                variant="contained"
                startIcon={<ArrowLeftIcon className="h-5 w-5" />}
                onClick={handleGoBack}
                sx={{
                  bgcolor: '#2c2c2c',
                  '&:hover': { bgcolor: '#3a3a3a' },
                }}
              >
                Go Back
              </Button>
            </div>
          </Container>
        </HomeAndGalleryChildLayout>
      </HomeAndGalleryParentLayout>
    );
  }

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-7xl py-6">
          <div className="flex flex-col items-start px-4 md:flex-row md:items-start md:gap-12">
            {/* Back button */}
            <Button
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={handleGoBack}
              className="mb-6 text-white hover:bg-[#ffffff20]"
            >
              Back
            </Button>

            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
              {/* Product image section */}
              <div className="relative aspect-square h-auto w-full overflow-hidden rounded-lg bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30"></div>
                <Image
                  src={productImage}
                  alt={product}
                  className="h-full w-full object-cover object-center"
                  width={500}
                  height={500}
                />
              </div>

              {/* Product details section */}
              <div className="flex flex-col space-y-6 text-white">
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
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Description</h2>
                  <p className="text-gray-300">
                    This premium {product.toLowerCase()} features high-quality
                    materials and exceptional craftsmanship. Perfect for any
                    occasion, it combines style, comfort, and durability.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="mb-3 text-xl font-semibold">Quantity</h2>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={handleDecrement}
                      className="min-w-10 h-10 rounded-full bg-[#ffffff20] text-white hover:bg-[#ffffff30]"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </Button>
                    <span className="text-xl">{quantity}</span>
                    <Button
                      onClick={handleIncrement}
                      className="min-w-10 h-10 rounded-full bg-[#ffffff20] text-white hover:bg-[#ffffff30]"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="mt-8 flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button
                    variant="contained"
                    startIcon={<ShoppingBagIcon className="h-5 w-5" />}
                    className="bg-white py-3 text-[13px] font-[600] tracking-wider text-black hover:bg-gray-100"
                    onClick={handleAddToCart}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-black py-3 text-[13px] font-[600] tracking-wider text-white hover:bg-gray-900"
                    onClick={handleCheckout}
                  >
                    BUY NOW • ₹{totalPrice}
                  </Button>
                </div>

                <div className="rounded-lg bg-[#ffffff10] p-4">
                  <h3 className="mb-2 font-semibold">Delivery Options</h3>
                  <p className="text-sm text-gray-300">
                    Free delivery available • 7 days return policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}

export default OrderPageContent;
