// Layout.styles.ts
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  /* flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0; */
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fafafa;
`;

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
