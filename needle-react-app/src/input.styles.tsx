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
  width: 100%;
  height: 35px;
`;

export const Label = styled.label`
  border: 1px solid transparent;
  line-height: 30px;
  height: 30px;
  padding: 0;

  z-index: 2;
  float: left;
  height: 10px;
  line-height: 10px;
  padding: 0px 5px 0px 5px;
  position: relative;
  left: 8px;
  top: 6px;
  color: #999;
  background-color: #fff;
  font-size: 15px;
`;
