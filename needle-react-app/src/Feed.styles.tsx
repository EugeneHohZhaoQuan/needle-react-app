import styled from 'styled-components';

export const FeedContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ImageCard = styled.div`
  display: grid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
