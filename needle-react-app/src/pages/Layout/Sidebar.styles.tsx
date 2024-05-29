import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  width: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const Logo = styled.h2`
  text-align: left;
  padding-left: 20px;
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
  display: flex;
  align-items: center;
  padding: 1.1em 0;
  padding-left: 20px;
  font-size: medium;
  font-weight: 500;
  text-align: left;
  width: 100%;
  color: #fff;
  cursor: pointer;

  img {
    margin-right: 10px;
    transition: 0.15s linear filter;
  }

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
  height: 100vh;
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
