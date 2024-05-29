import styled, { css } from 'styled-components';

interface TitleProps {
  selected?: boolean;
}

export const BreedCheckbox = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const SelectionContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  margin: 5px;
  border-radius: 8px;
`;

export const CheckboxGrid = styled.div`
  height: 500px;

  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1130px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  margin-right: 5px;
`;

export const DashboardContainer = styled.div``;

export const Title = styled.button<TitleProps>`
  font-size: larger;
  font-weight: 500;
  padding: 8px 16px;
  margin: 0 8px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: gray;

  &:focus {
    outline: none;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    border-bottom: 4px solid;
    transition: width 0.5s ease-out;
  }

  ${(props) =>
    props.selected &&
    css`
      color: black;

      &:after {
        color: black;
        width: 28%;
      }
    `}

  &:hover:after {
    ${(props) =>
      props.selected &&
      css`
        width: 43%;
      `}
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 0;
`;
