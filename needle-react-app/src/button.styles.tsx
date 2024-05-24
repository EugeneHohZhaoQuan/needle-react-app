import styled from 'styled-components';

export const PrimaryButton = styled.button`
  font-weight: 600;

  padding: 0.6em 1.2em;
  margin: 0 5px;
  border: 1px solid transparent;
  border-radius: 8px;

  background-color: #f3b64c;

  transition: background-color 0.25s;

  cursor: pointer;

  &:hover {
    background-color: #e3960f;
  }
`;

export const SecondaryButton = styled.button`
  font-weight: 600;

  padding: 0.6em 1.2em;
  margin: 0 5px;

  border: 1px solid #f3b64c;
  border-radius: 8px;

  color: #f3b64c;
  background-color: transparent;

  transition: background-color 0.25s;

  cursor: pointer;

  &:hover {
    background-color: #fdf0db;
  }
`;
