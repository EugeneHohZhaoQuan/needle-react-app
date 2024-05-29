import styled, { css } from 'styled-components';

interface DropdownProps {
  isOpen: boolean;
}

interface TitleProps {
  selected?: boolean;
}

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #3e8e41;
  }
`;

export const DropdownContent = styled.div<DropdownProps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  min-width: 160px;
  border: 1px solid #ddd;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
`;

export const BreedCheckbox = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const CheckboxGrid = styled.div`
  height: 500px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Default to 3 columns */
  grid-template-rows: repeat(5, auto); /* Default to 5 rows */
  gap: 10px; /* Adjust the gap between items */

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr); /* 1 column on smaller screens */
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on medium screens */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on larger screens */
  }
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  margin-right: 5px; /* Adjust margin as needed */
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
    width: 0; /* Default width set to 0 */
    border-bottom: 4px solid;
    transition: width 0.5s ease-out;
  }

  ${(props) =>
    props.selected &&
    css`
      color: black;

      &:after {
        color: black;
        width: 28%; /* Width when selected */
      }
    `}

  &:hover:after {
    ${(props) =>
      props.selected &&
      css`
        width: 43%; /* Width on hover if selected */
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
