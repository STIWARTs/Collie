'use client';

import { useState, useEffect } from 'react';
import { Button, TextField, Box, Divider, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import {
  ArrowLeftIcon,
  CreditCardIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useToast } from 'context/ToastContext';
import { useWallet } from 'context/WalletContext';

type CartItem = {
  Heading: string;
  Image: string;
  Category: string;
  Price: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { balance, withdrawFunds } = useWallet();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState('0.00');
  const [paymentMethod, setPaymentMethod] = useState('delivery');
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });

  // Calculate final amount
  const calculateFinalAmount = () => {
    return (
      parseFloat(total) +
      99 +
      parseFloat(total) * 0.18
    );
  };

  // Load cart items from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');

      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          setCartItems(items);

          // Calculate total
          const calculatedTotal = items.reduce(
            (sum: number, item: CartItem) => {
              const price = parseFloat(item.Price.replace('₹', '').trim());
              return sum + price;
            },
            0,
          );

          setTotal(calculatedTotal.toFixed(2));
        } catch (e) {
          console.error('Failed to parse cart items from localStorage');
          setCartItems([]);
        }
      }
    }
  }, []);

  // Check if wallet has sufficient funds
  useEffect(() => {
    const finalAmount = calculateFinalAmount();
    if (paymentMethod === 'wallet' && finalAmount > balance) {
      setInsufficientFunds(true);
    } else {
      setInsufficientFunds(false);
    }
  }, [paymentMethod, total, balance]);

  const handleRemoveItem = (index: number) => {
    const newCartItems = [...cartItems];
    const removedItem = newCartItems[index];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));

    // Show toast notification
    showToast(
      'Info',
      'Item Removed',
      `${removedItem.Heading} has been removed from your cart.`,
    );

    // Recalculate total
    const calculatedTotal = newCartItems.reduce((sum, item) => {
      const price = parseFloat(item.Price.replace('₹', '').trim());
      return sum + price;
    }, 0);

    setTotal(calculatedTotal.toFixed(2));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    // Validate form
    const { name, email, address, city, pincode, phone } = formData;
    if (!name || !email || !address || !city || !pincode || !phone) {
      showToast(
        'Warning',
        'Missing Information',
        'Please fill in all required fields.',
      );
      return;
    }

    // Calculate final amount
    const finalAmount = calculateFinalAmount();

    // Process order based on payment method
    if (paymentMethod === 'wallet') {
      // Check if wallet has sufficient funds
      if (finalAmount > balance) {
        showToast(
          'Error',
          'Insufficient Funds',
          `Your wallet balance (₹${balance.toFixed(2)}) is less than the order total (₹${finalAmount.toFixed(2)}).`,
        );
        return;
      }

      // Actually withdraw funds from wallet
      const success = withdrawFunds(finalAmount);
      
      if (success) {
        // Generate order description with item names
        const orderDescription = cartItems.map(item => item.Heading).join(', ');
        
        showToast(
          'Success',
          'Payment Successful',
          `₹${finalAmount.toFixed(2)} has been deducted from your wallet for: ${orderDescription}`,
        );
        
        // Clear cart
        localStorage.setItem('cartItems', JSON.stringify([]));
        
        // Redirect to home page after a brief delay
        setTimeout(() => {
          router.push('/wallet'); // Redirect to wallet page to see transaction
        }, 1500);
      } else {
        showToast(
          'Error',
          'Payment Failed',
          'Unable to process payment. Please try again.',
        );
      }
    } else {
      // Pay on delivery
      showToast(
        'Success',
        'Order Placed Successfully',
        'Your order has been placed for cash on delivery.',
      );
      
      // Clear cart
      localStorage.setItem('cartItems', JSON.stringify([]));
      
      // Redirect to home page after a brief delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  };

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Header */}
          <div className="mb-8 flex items-center">
            <Button
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={() => router.back()}
              className="text-white transition-all duration-200 ease-in-out hover:bg-white/10 hover:shadow-sm"
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
            <h1 className="ml-4 text-2xl font-bold text-white">Checkout</h1>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left column - Cart items */}
            <div className="lg:col-span-7">
              <div className="rounded-lg bg-[#181818] p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Order Summary
                </h2>

                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Image
                      src="/vectors/empty-wishlist-vector-white.svg"
                      alt="Empty cart"
                      width={100}
                      height={100}
                      className="mb-4 opacity-50"
                    />
                    <p className="text-gray-400">Your cart is empty</p>
                    <Button
                      className="mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:shadow-lg"
                      onClick={() => router.push('/')}
                      sx={{ textTransform: 'none' }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                            <Image
                              src={item.Image}
                              alt={item.Heading}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-white">
                              {item.Heading}
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                              {item.Category}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-base font-medium text-white">
                              {item.Price}
                            </p>
                            <Button
                              onClick={() => handleRemoveItem(index)}
                              className="min-w-0 rounded-full p-1.5 text-gray-400 transition-all duration-200 ease-in-out hover:bg-red-500/10 hover:text-red-500"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                        {index < cartItems.length - 1 && (
                          <Divider className="my-4 border-gray-700" />
                        )}
                      </div>
                    ))}

                    <Divider className="my-4 border-gray-700" />
                    <div className="flex justify-between">
                      <p className="text-base font-medium text-white">
                        Subtotal
                      </p>
                      <p className="text-base font-medium text-white">
                        ₹{total}
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-base font-medium text-white">
                        Shipping
                      </p>
                      <p className="text-base font-medium text-white">₹99.00</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-base font-medium text-white">Tax</p>
                      <p className="text-base font-medium text-white">
                        ₹{(parseFloat(total) * 0.18).toFixed(2)}
                      </p>
                    </div>
                    <Divider className="my-4 border-gray-700" />
                    <div className="flex justify-between">
                      <p className="text-lg font-bold text-white">Total</p>
                      <p className="text-lg font-bold text-white">
                        ₹{calculateFinalAmount().toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right column - Customer information */}
            <div className="lg:col-span-5">
              <div className="rounded-lg bg-[#181818] p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    multiline
                    rows={2}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <div className="flex space-x-4">
                    <TextField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      sx={{
                        width: '60%',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputBase-input': { color: 'white' },
                      }}
                    />
                    <TextField
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      sx={{
                        width: '40%',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputBase-input': { color: 'white' },
                      }}
                    />
                  </div>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                </div>

                <h2 className="mb-4 mt-8 text-xl font-semibold text-white">
                  Payment Method
                </h2>
                
                {/* Pay on Delivery Option */}
                <div 
                  className={`mb-3 cursor-pointer rounded-md border ${
                    paymentMethod === 'delivery' 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-gray-700'
                  } p-4 transition-all duration-200`}
                  onClick={() => handlePaymentMethodChange('delivery')}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod === 'delivery' 
                        ? 'border-green-500' 
                        : 'border-gray-500'
                    }`}>
                      {paymentMethod === 'delivery' && (
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-white">Pay on Delivery</p>
                      <p className="text-sm text-gray-400">
                        Pay with cash or card when your order arrives
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Pay from Wallet Option */}
                <div 
                  className={`cursor-pointer rounded-md border ${
                    paymentMethod === 'wallet' 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-gray-700'
                  } p-4 transition-all duration-200`}
                  onClick={() => handlePaymentMethodChange('wallet')}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      paymentMethod === 'wallet' 
                        ? 'border-green-500' 
                        : 'border-gray-500'
                    }`}>
                      {paymentMethod === 'wallet' && (
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <svg 
                      className="h-6 w-6 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                      />
                    </svg>
                    <div>
                      <p className="text-white">Pay from Wallet</p>
                      <p className="text-sm text-gray-400">
                        Use your wallet balance to pay for this order
                      </p>
                      <div className={`mt-1 text-sm font-semibold ${insufficientFunds ? 'text-red-500' : 'text-green-500'}`}>
                        Available Balance: ₹{balance.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Show insufficient funds warning */}
                {insufficientFunds && paymentMethod === 'wallet' && (
                  <div className="mt-3">
                    <Alert 
                      severity="error"
                      icon={<ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                      className="bg-red-500/10 border border-red-500/30 text-white"
                    >
                      <div className="text-sm font-medium">
                        Insufficient funds in wallet. Please add funds or choose a different payment method.
                      </div>
                    </Alert>
                  </div>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  className="relative mt-8 overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-500 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
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
                    '&:disabled': {
                      background: 'linear-gradient(to right, #4b5563, #6b7280)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0 || (paymentMethod === 'wallet' && insufficientFunds)}
                >
                  {paymentMethod === 'wallet' ? 'Pay ₹' + calculateFinalAmount().toFixed(2) + ' from Wallet' : 'Place Order'}
                </Button>

                {/* Add Funds Button (only show when wallet selected and insufficient funds) */}
                {paymentMethod === 'wallet' && insufficientFunds && (
                  <Button
                    fullWidth
                    variant="outlined"
                    className="mt-3 border-blue-500 py-3 text-sm font-semibold text-blue-500 hover:bg-blue-500/10"
                    onClick={() => router.push('/wallet')}
                    sx={{ textTransform: 'none' }}
                  >
                    Add Funds to Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
