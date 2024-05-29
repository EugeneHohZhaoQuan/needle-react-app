import styled from 'styled-components';

export const FeedContainer = styled.div`
  /* margin: 28px 0;

  display: flex;
  gap: 10px;

  @media (max-width: 767px) {
    display: grid;
  }

  column-count: 3;
  column-gap: 16px;
  padding: 16px;

  @media (max-width: 1200px) {
    column-count: 2;
  }

  @media (max-width: 768px) {
    column-count: 1;
  } */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
`;

export const ImageContainer = styled.div`
  break-inside: avoid;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  height: fit-content;
`;

export const ListContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const ImageCard = styled.div`
  /* box-shadow: 1px 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  margin: 10px;

  &:hover {
    box-shadow: 1px 8px 16px 0 rgba(0, 0, 0, 0.2);
  } */

  margin: 10px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all 300ms;

  /* &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  } */

  &:hover .image-overlay,
  &:hover .like-button,
  &:hover .description {
    opacity: 1;
  }
`;

export const ImageElement = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const FeedButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LikeButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 80%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Description = styled.p`
  position: absolute;
  top: -10px;
  left: 25%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &:hover {
    opacity: 1;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 20px;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#f3b64c' : '#f1f1f1')};
  border: none;
  color: ${({ active }) => (active ? '#000' : '#f3b64c')};
  padding: 5px 15px;
  cursor: pointer;
  font-size: 12px;
  margin: 0 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) =>
    active ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'};

  &:hover {
    background-color: #e3960f;
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;
