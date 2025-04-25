'use client';

import React, { ReactNode } from 'react';

interface CartWrapperProps {
  children: ReactNode;
}

// Since CartContext has been removed, this component now simply passes children through
function CartWrapper({ children }: CartWrapperProps) {
  return <>{children}</>;
}

export default CartWrapper;
