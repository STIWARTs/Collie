import 'app/globals.css';
import 'styles/main.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Web3ProviderWrapper from '../components/Web3ProviderWrapper';

// Dynamically import providers to reduce initial bundle size
const CssVarsProvider = dynamic(() => import('providers/CssVarsProvider'), {
  ssr: true,
});
const ContextProvider = dynamic(() => import('providers/ContextProvider'), {
  ssr: true,
});
const EmotionCacheProvider = dynamic(
  () => import('providers/EmotionCacheProvider'),
  {
    ssr: true,
  },
);

// Import AIButtonWrapper
const AIButtonWrapper = dynamic(
  () => import('../components/chat/AIButtonWrapper'),
);

// Create a client component wrapper for CartProvider
const CartWrapper = dynamic(() => import('../components/cart/CartWrapper'), {
  ssr: true,
});

// Import ToastProvider
const ToastProvider = dynamic(() => import('../context/ToastContext'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Collie • Fashion Redefined',
  description: 'Welcome to Collie - Your Personal Fashion Assistant',
  icons: '/favicon.ico',
  metadataBase: new URL('https://collie-fashion.vercel.app'),
  openGraph: {
    title: 'Collie • Fashion Redefined',
    description: 'Your Personal Fashion Assistant',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://firebasestorage.googleapis.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link
          rel="dns-prefetch"
          href="https://firebasestorage.googleapis.com"
        />
      </head>
      <body>
        <EmotionCacheProvider
          options={{ key: 'mui-emotion-style', prepend: true }}
        >
          <CssVarsProvider>
            <ContextProvider>
              <Web3ProviderWrapper>
                <CartWrapper>
                  <ToastProvider>
                    <Suspense fallback={null}>{children}</Suspense>
                    <Suspense fallback={null}>
                      <AIButtonWrapper />
                    </Suspense>
                  </ToastProvider>
                </CartWrapper>
              </Web3ProviderWrapper>
            </ContextProvider>
          </CssVarsProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout;
