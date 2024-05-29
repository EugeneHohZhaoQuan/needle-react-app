import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(90deg, #fefaf3, #f7ce87);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;
`;

export const LoginContainer = styled.div`
  display: block;
  text-align: center;
  width: 380px;

  border: 2px solid #a3a3a3;
  border-radius: 8px;

  padding: 20px;
`;

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  text-align: -webkit-center;
`;

export const InputContainer = styled.div`
  margin-bottom: 2.67rem;
`;
