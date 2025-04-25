'use client';

import { useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import {
  ArrowLeftIcon,
  EyeIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

// Dynamic config
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Sample order data
const orders = [
  {
    id: 'ORD12345678',
    date: 'July 28, 2023',
    status: 'Delivered',
    total: '₹5,498.00',
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
  },
  {
    id: 'ORD12345679',
    date: 'August 5, 2023',
    status: 'Processing',
    total: '₹2,499.00',
    items: [
      {
        name: 'Designer Sunglasses',
        image: '/images/avatar/products/sunglasses.jpg',
        price: '₹2499.00',
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD12345680',
    date: 'August 15, 2023',
    status: 'Shipped',
    total: '₹3,999.00',
    items: [
      {
        name: 'Leather Crossbody Bag',
        image: '/images/avatar/products/crossboy-bag.jpg',
        price: '₹3999.00',
        quantity: 1,
      },
    ],
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTrackOrder = (orderId: string) => {
    router.push(`/account/track-order?orderId=${orderId}`);
  };

  const handleViewDetails = (orderId: string) => {
    // In a real app, this would navigate to a detailed order page
    router.push(`/account/orders/${orderId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderOrders = (statusFilter?: string) => {
    const filteredOrders = statusFilter
      ? orders.filter((order) => order.status === statusFilter)
      : orders;

    if (filteredOrders.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Image
            src="/vectors/empty-wishlist-vector-white.svg"
            alt="No orders"
            width={100}
            height={100}
            className="mb-4 opacity-50"
          />
          <Typography variant="body1" className="text-white">
            No orders found
          </Typography>
          <Button
            variant="contained"
            className="relative mt-4 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
            onClick={() => router.push('/')}
            sx={{ textTransform: 'none' }}
          >
            Continue Shopping
          </Button>
        </div>
      );
    }

    return filteredOrders.map((order, index) => (
      <Paper key={index} className="mb-6 rounded-xl bg-[#181818] p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <Typography variant="h6" className="text-white">
              Order #{order.id}
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              Placed on {order.date}
            </Typography>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <Chip
              label={order.status}
              color={
                getStatusColor(order.status) as
                  | 'success'
                  | 'info'
                  | 'primary'
                  | 'error'
                  | 'default'
              }
              size="small"
              variant="outlined"
            />
            <Typography variant="body1" className="font-semibold text-white">
              {order.total}
            </Typography>
          </div>
        </div>

        <Divider className="my-4 border-gray-700" />

        <div className="space-y-4">
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center space-x-4">
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
        </div>

        <Divider className="my-4 border-gray-700" />

        <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <Button
            variant="outlined"
            startIcon={<EyeIcon className="h-5 w-5" />}
            className="border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
            onClick={() => handleViewDetails(order.id)}
            sx={{ textTransform: 'none' }}
          >
            View Details
          </Button>
          {(order.status === 'Processing' || order.status === 'Shipped') && (
            <Button
              variant="outlined"
              startIcon={<ArrowPathIcon className="h-5 w-5" />}
              className="border-blue-500/70 text-blue-500 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10"
              onClick={() => handleTrackOrder(order.id)}
              sx={{ textTransform: 'none' }}
            >
              Track Order
            </Button>
          )}
        </div>
      </Paper>
    ));
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
            <h1 className="ml-4 text-2xl font-bold text-white">My Orders</h1>
          </div>

          {/* Order tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="order tabs"
              sx={{
                '& .MuiTab-root': { color: '#ffffff80', textTransform: 'none' },
                '& .Mui-selected': { color: '#ffffff' },
                '& .MuiTabs-indicator': { backgroundColor: '#ffffff' },
              }}
            >
              <Tab
                label="All Orders"
                id="order-tab-0"
                aria-controls="order-tabpanel-0"
              />
              <Tab
                label="Processing"
                id="order-tab-1"
                aria-controls="order-tabpanel-1"
              />
              <Tab
                label="Shipped"
                id="order-tab-2"
                aria-controls="order-tabpanel-2"
              />
              <Tab
                label="Delivered"
                id="order-tab-3"
                aria-controls="order-tabpanel-3"
              />
            </Tabs>
          </Box>

          {/* Tab panels */}
          <TabPanel value={tabValue} index={0}>
            {renderOrders()}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {renderOrders('Processing')}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {renderOrders('Shipped')}
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            {renderOrders('Delivered')}
          </TabPanel>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
