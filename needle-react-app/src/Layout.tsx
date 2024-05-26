// Layout.tsx
import React from 'react';
import { Header } from './Header';
import { LayoutContainer, MainContent } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <div className="layout-content">
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
