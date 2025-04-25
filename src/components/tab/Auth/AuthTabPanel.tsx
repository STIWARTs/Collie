import React, { ReactNode } from 'react';

interface TabPanelProps {
  children: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function AuthTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tabpanel-${index}`}
      className="h-full w-full"
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default AuthTabPanel;
