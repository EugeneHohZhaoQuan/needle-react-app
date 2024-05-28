import styled from 'styled-components';

export const MainInput = styled.input`
  border: 1px solid transparent;
  line-height: 30px;
  padding: 5px 7px;

  display: block;
  margin-bottom: 2px;
  border-radius: 8px;
  border-color: #ccc;
  text-indent: 5px;
  width: 96%;
  height: 35px;

  &:hover {
    border: 1px solid #f8d393;
  }

  &::placeholder {
    color: #ccc;
  }

  &:focus,
  &:focus-visible,
  &:active {
    border: 2px solid #f3b74c !important; /* Added !important for specificity */
    outline: none; /* Remove default outline */
  }
`;

export const Label = styled.label`
  border: 1px solid transparent;

  height: 30px;
  padding: 4px;

  z-index: 2;
  float: left;
  height: 10px;
  line-height: 16px;

  position: relative;
  left: 8px;
  top: 6px;
  color: #999;
  background-color: #fff;
  font-size: 14px;
  font-weight: 400;
`;
