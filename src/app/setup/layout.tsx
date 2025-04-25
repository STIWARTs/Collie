import { Metadata, Viewport } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Setup your Collie Account • Collie',
  description: 'Welcome to setup wizard of Collie account',
  robots: {
    index: false,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
};

function SetupLayout({ children }: ChildrenType) {
  return (
    <>
      <div className="box-border flex h-full w-screen items-start justify-center overflow-hidden md:h-screen md:items-center md:bg-[#0f0f0f] md:p-[32px]">
        <div className="md:Setup-DropShadow relative box-border flex h-full w-full items-center justify-center overflow-hidden bg-[#202020] md:h-[652px] md:max-w-[1040px] md:rounded-xl">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </div>
      <div
        id="verify-sign-in-recaptcha"
        className="absolute top-0 flex h-full items-center justify-center sm:h-screen"
      />
    </>
  );
}

export default SetupLayout;
