// Layout.styles.ts
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  /* flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0; */
`;

export const SidebarContainer = styled.div`
  width: 15%;
  position: fixed;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fafafa;
`;

export const MainContainer = styled.div`
  flex: 1;
  width: 85%;
  margin-left: 15%;
  display: flex;
  flex-direction: column;
`;
