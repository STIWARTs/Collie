'use client';

import { useState } from 'react';
import { useScreenDimensions } from '../../../hooks/useScreenDimensions';
import SidePanel from 'components/sidepanel/SidePanel';
import ContainerDark from 'components/container/ContainerDark';
import ResponsiveLayout from '../ResponsiveLayout';

function HomeAndGalleryParentLayout({ children }: ChildrenType) {
  const [Active, setActive] = useState('Home');
  const { isMobile } = useScreenDimensions();

  if (isMobile) {
    return (
      <ResponsiveLayout>
        <ContainerDark>{children}</ContainerDark>
      </ResponsiveLayout>
    );
  }

  return (
    <ContainerDark>
      <SidePanel Active={Active} setActive={setActive} />
      {children}
    </ContainerDark>
  );
}

export default HomeAndGalleryParentLayout;
