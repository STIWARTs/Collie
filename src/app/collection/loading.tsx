import React from 'react';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';

export default function LoadingCollection() {
  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-7xl py-6">
          <div className="flex flex-col px-4">
            <div className="h-10 w-20 animate-pulse rounded-md bg-gray-700" />

            <div className="mb-6 mt-6 flex items-center justify-between">
              <div>
                <div className="h-8 w-64 animate-pulse rounded-md bg-gray-700" />
                <div className="mt-2 h-4 w-96 animate-pulse rounded-md bg-gray-700" />
              </div>
              <div className="h-10 w-32 animate-pulse rounded-md bg-gray-700" />
            </div>

            <div className="mb-6 h-24 w-full animate-pulse rounded-lg bg-gray-700" />

            <div className="w-full">
              <div className="mb-6 h-8 w-64 animate-pulse rounded-md bg-gray-700" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-96 w-full animate-pulse rounded-lg bg-gray-700"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
