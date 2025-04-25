'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import DiscoverInterface from 'interfaces/Discover.Interface';

export default function CatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Current path:', pathname);

    if (pathname === '/order' || pathname === '/details') {
      console.log('Intercepted navigation to:', pathname);

      // The specific pages should handle this, but this is a fallback
      const product = searchParams.get('product');
      const price = searchParams.get('price');

      console.log('Product:', product);
      console.log('Price:', price);
    }
  }, [pathname, searchParams]);

  // Return the home page content as default
  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <DiscoverInterface />
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
