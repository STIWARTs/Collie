'use client';

import { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import {
  ArrowLeftIcon,
  MapPinIcon,
  TruckIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useToast } from 'context/ToastContext';

// Dynamic config
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const steps = [
  'Order Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function TrackOrderPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState<null | {
    orderNumber: string;
    status: number;
    expectedDelivery: string;
    items: Array<{
      name: string;
      image: string;
      price: string;
      quantity: number;
    }>;
    trackingNumber: string;
    carrier: string;
  }>(null);

  const handleTrackOrder = () => {
    if (!orderNumber || !email) {
      showToast(
        'Warning',
        'Missing Information',
        'Please enter both order number and email.',
      );
      return;
    }

    // Mock data - in a real app this would be fetched from an API
    setTrackingData({
      orderNumber: orderNumber,
      status: 2, // 0-4 corresponding to steps array
      expectedDelivery: 'August 15, 2023',
      items: [
        {
          name: 'Premium Cotton T-Shirt',
          image: '/images/avatar/products/premium-tshirt.jpg',
          price: '₹1999.00',
          quantity: 1,
        },
        {
          name: 'Denim Jacket - Classic Blue',
          image: '/images/avatar/products/denim-jacket.jpg',
          price: '₹3499.00',
          quantity: 1,
        },
      ],
      trackingNumber: 'TRK' + Math.floor(Math.random() * 10000000),
      carrier: 'Express Delivery',
    });

    showToast(
      'Success',
      'Order Found',
      'Your order tracking information has been loaded.',
    );
  };

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-5xl px-4 py-8">
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
            <h1 className="ml-4 text-2xl font-bold text-white">Track Order</h1>
          </div>

          {/* Track Order Form */}
          <Paper className="rounded-xl bg-[#181818] p-6">
            <Typography variant="h6" className="mb-4 text-white">
              Enter Your Order Details
            </Typography>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                variant="outlined"
                placeholder="e.g., ORD123456789"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
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
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                placeholder="Email used for the order"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
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
              <Button
                fullWidth
                variant="contained"
                className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                onClick={handleTrackOrder}
                sx={{ textTransform: 'none', mt: 2 }}
              >
                Track Order
              </Button>
            </div>
          </Paper>

          {/* Order Tracking Information */}
          {trackingData && (
            <Paper className="mt-6 rounded-xl bg-[#181818] p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <Typography variant="h6" className="text-white">
                    Order #{trackingData.orderNumber}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Expected delivery: {trackingData.expectedDelivery}
                  </Typography>
                </div>
                <div className="mt-2 md:mt-0">
                  <Typography variant="body2" className="text-gray-400">
                    Tracking #: {trackingData.trackingNumber}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Carrier: {trackingData.carrier}
                  </Typography>
                </div>
              </div>

              <Box sx={{ width: '100%', mt: 4 }}>
                <Stepper activeStep={trackingData.status} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Divider className="my-6 border-gray-700" />

              <Typography variant="h6" className="mb-4 text-white">
                Order Items
              </Typography>

              {trackingData.items.map((item, index) => (
                <div key={index} className="mb-4 flex items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <Typography variant="body1" className="text-white">
                      {item.name}
                    </Typography>
                    <div className="flex items-center">
                      <Typography variant="body2" className="text-gray-400">
                        Qty: {item.quantity}
                      </Typography>
                      <span className="mx-2 text-gray-400">•</span>
                      <Typography variant="body2" className="text-gray-400">
                        {item.price}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}

              <Divider className="my-6 border-gray-700" />

              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <Button
                  variant="outlined"
                  startIcon={<QuestionMarkCircleIcon className="h-5 w-5" />}
                  className="border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                  sx={{ textTransform: 'none' }}
                  onClick={() =>
                    showToast(
                      'Info',
                      'Help Requested',
                      'Our support team will contact you shortly.',
                    )
                  }
                >
                  Need Help?
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MapPinIcon className="h-5 w-5" />}
                  className="border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                  sx={{ textTransform: 'none' }}
                  onClick={() => router.push('/account/orders')}
                >
                  View All Orders
                </Button>
              </div>
            </Paper>
          )}
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
