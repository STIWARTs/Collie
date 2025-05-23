'use client';

import { useScreenDimensions } from '../../../hooks/useScreenDimensions';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';

function HomeAndGalleryChildLayout({ children }: ChildrenType) {
  const { isMobile } = useScreenDimensions();

  function Children() {
    return <div className="z-auto w-full">{children}</div>;
  }

  if (isMobile)
    return (
      <main className="z-auto mx-auto w-full">
        <Children />
        <Footer />
      </main>
    );

  return (
    <main className="z-auto h-screen w-full pl-[268px]">
      <div className="h-full w-full">
        <Header />
        <div className="fixed h-full w-full overflow-hidden pb-3 pr-[278px] pt-[70px]">
          <div className=" mx-auto flex h-full w-full max-w-[2000px] flex-col overflow-hidden rounded-xl bg-[#181818]">
            <div className="flex w-full flex-col overflow-auto">
              <Children />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomeAndGalleryChildLayout;
