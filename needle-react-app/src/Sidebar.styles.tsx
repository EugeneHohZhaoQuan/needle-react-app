import styled, { css } from 'styled-components';

export const Logo = styled.h1`
  text-align: center;
  padding: 0;
  margin: 0;

  a {
    color: #000;
    display: block;
    padding: 1em 0;
    text-decoration: none;
    transition: 0.15s linear color;

    &:hover {
      color: #9b660a;
    }
  }
`;

export const Content = styled.div<{ selected?: boolean }>`
  padding: 1.1em 0;
  text-align: center;
  width: 100%;

  &:hover {
    color: #000;
    background-color: #fff;
  }

  ${(props) =>
    props.selected &&
    css`
      font-weight: bolder;
      background-color: #fff;
      color: #000;
    `}
`;
