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

import { MainContainer, LoginContainer, ButtonContainer } from './main.styles';
import { PrimaryButton, SecondaryButton } from './button.styles';
import { MainInput, Label } from './input.styles';

function Login() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      //setUser(userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out: ', error);
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
        <h1>Needle React App </h1>
        {error !== null && <>{error}</>}

        {login && (
          <LoginContainer>
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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
          </LoginContainer>
        )}

        {!login && (
          <LoginContainer>
            <div>Create an account</div>
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <ButtonContainer>
              <SecondaryButton onClick={handleSignUp}>Sign Up</SecondaryButton>
            </ButtonContainer>
          </LoginContainer>
        )}
      </LoginContainer>
    </MainContainer>
  );
}

export default Login;
