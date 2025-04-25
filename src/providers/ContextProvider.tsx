'use client';

import { ReactNode } from 'react';
import { ExampleState } from 'contexts/ExampleState';

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  return <ExampleState value={{ show: false }}>{children}</ExampleState>;
}

export default ContextProvider;
