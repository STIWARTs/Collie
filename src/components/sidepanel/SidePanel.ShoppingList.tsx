import Image from 'next/image';
import { Button, Tab, Tabs } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  HomeCartContent,
  HomeCartContentProps,
  HomeWishlistContent,
  HomeWishlistContentProps,
} from 'contents/home/Home.ShoppingList';
import { useToast } from 'context/ToastContext';

function SidePanelShoppingList() {
  const [tabValue, setTabValue] = useState(0);
  const [cartItems, setCartItems] = useState<HomeCartContentProps[]>([]);
  const [wishlistItems, setWishlistItems] = useState<
    HomeWishlistContentProps[]
  >([]);
  const [cartTotal, setCartTotal] = useState('0.00');
  const { showToast } = useToast();

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      const savedWishlist = localStorage.getItem('wishlistItems');

      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart items from localStorage');
          setCartItems(HomeCartContent);
        }
      } else {
        setCartItems(HomeCartContent);
      }

      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (e) {
          console.error('Failed to parse wishlist items from localStorage');
          setWishlistItems(HomeWishlistContent);
        }
      } else {
        setWishlistItems(HomeWishlistContent);
      }
    }
  }, []);

  // Calculate cart total
  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        // Safely extract numeric value even if format varies (with or without ₹)
        const price = parseFloat(item.Price.replace('₹', '').trim());
        return sum + price;
      }, 0);
      setCartTotal(total.toFixed(2));
    } else {
      setCartTotal('0.00');
    }
  }, [cartItems]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems];
    const removedItem = newCartItems[index];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    showToast(
      'Info',
      'Item Removed',
      `${removedItem.Heading} has been removed from your cart.`,
    );
  };

  const removeFromWishlist = (index: number) => {
    const newWishlistItems = [...wishlistItems];
    const removedItem = newWishlistItems[index];
    newWishlistItems.splice(index, 1);
    setWishlistItems(newWishlistItems);
    localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));
    showToast(
      'Info',
      'Item Removed',
      `${removedItem.Heading} has been removed from your wishlist.`,
    );
  };

  const moveToCart = (index: number) => {
    const itemToMove = wishlistItems[index];
    if (!cartItems.some((item) => item.Heading === itemToMove.Heading)) {
      const newCartItems = [...cartItems, itemToMove];
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      showToast(
        'Success',
        'Added to Cart',
        `${itemToMove.Heading} has been moved to your cart.`,
      );
    } else {
      showToast(
        'Info',
        'Already in Cart',
        `${itemToMove.Heading} is already in your cart.`,
      );
    }
    removeFromWishlist(index);
  };

  const moveToWishlist = (index: number) => {
    const itemToMove = cartItems[index];
    if (!wishlistItems.some((item) => item.Heading === itemToMove.Heading)) {
      const newWishlistItems = [...wishlistItems, itemToMove];
      setWishlistItems(newWishlistItems);
      localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));
      showToast(
        'Success',
        'Added to Wishlist',
        `${itemToMove.Heading} has been moved to your wishlist.`,
      );
    } else {
      showToast(
        'Info',
        'Already in Wishlist',
        `${itemToMove.Heading} is already in your wishlist.`,
      );
    }
    removeFromCart(index);
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      setCartItems([]);
      localStorage.setItem('cartItems', JSON.stringify([]));
      showToast(
        'Success',
        'Cart Cleared',
        'All items have been removed from your cart.',
      );
    } else {
      showToast('Info', 'Empty Cart', 'Your cart is already empty.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      showToast(
        'Success',
        'Proceeding to Checkout',
        'Taking you to checkout...',
      );
      window.location.href = '/checkout';
    } else {
      showToast(
        'Warning',
        'Empty Cart',
        'Please add items to your cart before checking out.',
      );
    }
  };

  return (
    <div className="mx-2 mb-2 mt-2.5 h-full w-full overflow-hidden rounded-xl bg-[#181818]">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <Button
          className="button-text-lower group my-5 flex w-full cursor-pointer items-center justify-start space-x-4 bg-transparent p-0 pl-6 pr-5 text-white hover:bg-transparent"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: '#ffffff00 !important',
            },
          }}
        >
          <Image
            height={22}
            width={22}
            className="opacity-60 group-hover:opacity-100 group-hover:transition-opacity"
            src="/icons/shopping-cart-fill.svg"
            alt=""
          />
          <p className="w-full truncate text-left text-[14px] font-[600] tracking-wide text-white opacity-60 group-hover:opacity-100 group-hover:transition-opacity">
            Shopping List
          </p>
          <Image
            height={22}
            width={22}
            src="/icons/arrow-right.svg"
            className="opacity-60 group-hover:opacity-100 group-hover:transition-opacity"
            alt=""
          />
        </Button>

        {/* Tabs for Cart and Wishlist */}
        <div className="px-3">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            className="mb-2"
            TabIndicatorProps={{
              style: {
                backgroundColor: '#ffffff',
              },
            }}
            sx={{
              '& .MuiTab-root': {
                color: '#ffffff80',
                fontSize: '0.75rem',
                textTransform: 'none',
                minHeight: '36px',
              },
              '& .Mui-selected': {
                color: '#ffffff',
              },
              '& .MuiTabs-flexContainer': {
                backgroundColor: '#0f0f0f',
                borderRadius: '6px',
              },
            }}
          >
            <Tab label={`Wishlist (${wishlistItems.length})`} />
            <Tab label={`Cart (${cartItems.length})`} />
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="h-full overflow-auto px-2">
          {tabValue === 0 ? (
            wishlistItems.length === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center space-y-5 pt-[150px] opacity-50">
                <Image
                  height={100}
                  width={100}
                  src="/vectors/empty-wishlist-vector-white.svg"
                  alt=""
                />
                <p className="truncate text-[12px] font-[400] tracking-wide">
                  Your wishlist is empty
                </p>
              </div>
            ) : (
              <div className="flex w-full flex-col space-y-2 py-2">
                {wishlistItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full rounded-lg bg-[#ffffff0a] p-3 hover:bg-[#ffffff15]"
                  >
                    <div className="flex w-full items-center space-x-3">
                      <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-md bg-gray-800">
                        <Image
                          width={50}
                          height={50}
                          className="h-[50px] w-[50px] rounded-md object-cover"
                          src={item.Image}
                          alt={item.Heading}
                          unoptimized
                        />
                      </div>
                      <div className="w-full">
                        <p className="truncate text-sm font-medium text-white">
                          {item.Heading}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-white/70">
                            {item.Category}
                          </p>
                          <span className="text-xs text-white/70">•</span>
                          <p className="text-xs text-white/70">{item.Price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="small"
                          className="min-w-0 p-1"
                          onClick={() => moveToCart(index)}
                        >
                          <Image
                            height={16}
                            width={16}
                            src="/icons/shopping-list-cart.svg"
                            alt="Add to cart"
                          />
                        </Button>
                        <Button
                          size="small"
                          className="min-w-0 p-1"
                          onClick={() => removeFromWishlist(index)}
                        >
                          <Image
                            height={16}
                            width={16}
                            src="/icons/x-white-2.svg"
                            alt="Remove"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : cartItems.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-5 pt-[150px] opacity-50">
              <Image
                height={100}
                width={100}
                src="/vectors/empty-wishlist-vector-white.svg"
                alt=""
              />
              <p className="truncate text-[12px] font-[400] tracking-wide">
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="flex w-full flex-col space-y-2 py-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full rounded-lg bg-[#ffffff0a] p-3 hover:bg-[#ffffff15]"
                >
                  <div className="flex w-full items-center space-x-3">
                    <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-md bg-gray-800">
                      <Image
                        width={50}
                        height={50}
                        className="h-[50px] w-[50px] rounded-md object-cover"
                        src={item.Image}
                        alt={item.Heading}
                        unoptimized
                      />
                    </div>
                    <div className="w-full">
                      <p className="truncate text-sm font-medium text-white">
                        {item.Heading}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-white/70">{item.Category}</p>
                        <span className="text-xs text-white/70">•</span>
                        <p className="text-xs text-white/70">{item.Price}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="small"
                        className="min-w-0 p-1"
                        onClick={() => moveToWishlist(index)}
                      >
                        <Image
                          height={16}
                          width={16}
                          src="/icons/shopping-list-wishlist.svg"
                          alt="Add to wishlist"
                        />
                      </Button>
                      <Button
                        size="small"
                        className="min-w-0 p-1"
                        onClick={() => removeFromCart(index)}
                      >
                        <Image
                          height={16}
                          width={16}
                          src="/icons/x-white-2.svg"
                          alt="Remove"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2 px-2">
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <p className="text-xs text-white/70">Total:</p>
                  <p className="text-sm font-medium text-white">₹{cartTotal}</p>
                </div>
                <div className="mt-2 flex flex-col space-y-2">
                  <Button
                    className="w-full rounded-md bg-[#ffffff10] text-sm text-white hover:bg-[#ffffff20]"
                    sx={{ py: 1 }}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <Button
                    className="w-full rounded-md bg-[#ff000020] text-sm text-white hover:bg-[#ff000040]"
                    sx={{ py: 1 }}
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SidePanelShoppingList;
