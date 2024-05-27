// src/App.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { setUsername, clearUsername } from './store/userSlice';

import {
  MainContainer,
  LoginContainer,
  ButtonContainer,
  InputContainer,
} from './main.styles';
import { PrimaryButton, SecondaryButton } from './button.styles';
import { MainInput, Label } from './input.styles';

function Login() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(setUsername(email));
      //setUser(userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      setError(null); // Clear any previous error
      setLogin(true);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <MainContainer>
      <LoginContainer>
        <h1>Woof</h1>
        {error !== null && <>{error}</>}

        {login && (
          <div>
            <InputContainer>
              <div>
                <Label htmlFor="emailInput">Email</Label>
                <MainInput
                  id="emailInput"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="passwordInput">Password</Label>
                <MainInput
                  id="passwordInput"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </InputContainer>
            <ButtonContainer>
              <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
              <div>
                Don't have an account ?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLogin(false);
                  }}
                >
                  Sign Up
                </a>
              </div>
            </ButtonContainer>
          </div>
        )}

        {!login && (
          <div>
            <h2>Create an account</h2>
            <div>
              <Label htmlFor="emailInput">Email</Label>
              <MainInput
                id="emailInput"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="passwordInput">Password</Label>
              <MainInput
                id="passwordInput"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <ButtonContainer>
              <PrimaryButton onClick={handleSignUp}>Sign Up</PrimaryButton>
              <div>
                Return to{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLogin(true);
                  }}
                >
                  Login
                </a>
              </div>
            </ButtonContainer>
          </div>
        )}
      </LoginContainer>
    </MainContainer>
  );
}

export default Login;
