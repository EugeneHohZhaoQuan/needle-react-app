// Layout.tsx
import React from 'react';
import { Header } from './Header';
import { LayoutContainer, MainContent } from './Layout.styles';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <div className="layout-content">
        {/* <Sidebar /> */}
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
