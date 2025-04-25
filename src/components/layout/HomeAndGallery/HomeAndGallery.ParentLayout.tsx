'use client'

import { useState } from 'react';
import { DeviceHook } from 'hooks/global/Hooks.Device';
import SidePanel from 'components/sidepanel/SidePanel';
import ContainerDark from 'components/container/ContainerDark';

function HomeAndGalleryParentLayout({ children }: ChildrenType) {
  const [Active, setActive] = useState('Home');
  const { isMobile } = DeviceHook();

  if (isMobile) return <ContainerDark>{children}</ContainerDark>;

  return (
    <ContainerDark>
      <SidePanel Active={Active} setActive={setActive} />
      {children}
    </ContainerDark>
  );
}

export default HomeAndGalleryParentLayout;
