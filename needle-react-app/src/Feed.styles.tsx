import styled from 'styled-components';

export const FeedContainer = styled.div`
  margin: 28px 0;

  display: flex;
  gap: 10px;

  @media (max-width: 767px) {
    display: grid;
  }
`;

export const ImageContainer = styled.div`
  display: grid;
  gap: 18px;
`;

export const ImageCard = styled.div`
  border: none;
  border-radius: 8px;

  box-shadow: 1px 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 1px 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
