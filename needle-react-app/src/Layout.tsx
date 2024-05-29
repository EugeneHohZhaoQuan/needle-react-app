import React from 'react';
import { Header } from './Header';
import { LayoutContainer, MainContent, MainContainer } from './Layout.styles';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContainer>
        <Header />
        <MainContent>{children}</MainContent>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;
