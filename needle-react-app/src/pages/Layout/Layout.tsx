import React from 'react';
import {
  LayoutContainer,
  MainContent,
  MainContainer,
  SidebarContainer,
} from './Layout.styles';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <MainContent>{children}</MainContent>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;
