import styled from 'styled-components';

export const PrimaryButton = styled.button`
  width: 100%;
  font-weight: 600;

  padding: 0.6em 1.2em;

  border: 1px solid transparent;
  border-radius: 8px;

  background-color: #f3b64c;

  transition: background-color 0.25s;

  cursor: pointer;
  &:hover {
    background-color: #e3960f;
  }

  ${({ disabled }) =>
    disabled &&
    `
      background-color: #fdf0db;
      cursor: not-allowed;
      &:hover {
        background-color: #fdf0db;
      }
  `}
`;

export const SecondaryButton = styled.button`
  width: 100%;
  font-weight: 600;

  padding: 0.6em 1.2em;

  border: 1px solid #f3b64c;
  border-radius: 8px;

  color: #f3b64c;
  background-color: transparent;

  transition: background-color 0.25s;

  cursor: pointer;

  &:hover {
    background-color: #fdf0db;
  }

  ${({ disabled }) =>
    disabled &&
    `
      background-color: #fdf0db;
      cursor: not-allowed;
      &:hover {
        background-color: #fdf0db;
      }
  `}
`;
