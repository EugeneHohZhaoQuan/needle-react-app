import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const Logo = styled.h1`
  text-align: center;
  padding: 0;
  margin: 0;

  a {
    color: #fff;
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
  padding-left: 20px;
  font-size: medium;
  font-weight: 500;
  text-align: left;
  width: 100%;
  color: #fff;

  &:hover {
    color: #9b660a;
  }

  ${(props) =>
    props.selected &&
    css`
      font-weight: bolder;

      color: #9b660a;
    `}
`;

export const Container = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
  padding: 20px;
`;

export const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #9b660a;
  }
`;
