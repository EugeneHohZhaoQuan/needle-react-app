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

const isValidEmail = (email: string) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Login() {
  const [login, setLogin] = useState(true);

  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState(true);

  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUsername(email));
      reset();
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Please check your email or register.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError(
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
        );
      } else {
        setError('An error occurred while logging in. Please try again later.');
      }
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
      setLogin(true);
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const reset = () => {
    setEmail('');
    setError('');
    setPassword('');
  };

  return (
    <MainContainer>
      <LoginContainer>
        {login && (
          <div>
            <h1>Login</h1>
            <h3>Enter your credentials</h3>
            <InputContainer>
              {!isValid && (
                <p style={{ color: 'red' }}>
                  Please enter a valid email address.
                </p>
              )}

              {error !== null && <p style={{ color: 'red' }}>{error}</p>}
              <div>
                <Label htmlFor="emailInput">Email</Label>
                <MainInput
                  id="emailInput"
                  type="email"
                  placeholder="Enter you email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValid(isValidEmail(e.target.value));
                  }}
                  style={{
                    border: isValid ? '' : '2px solid red',
                  }}
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
                    reset();
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
            {!isValid && (
              <p style={{ color: 'red' }}>
                Please enter a valid email address.
              </p>
            )}
            <div>
              <Label htmlFor="emailInput">Email</Label>
              <MainInput
                id="emailInput"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsValid(isValidEmail(e.target.value));
                }}
                style={{
                  border: isValid ? '' : '2px solid red',
                }}
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
                    reset();
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
