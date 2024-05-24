// src/App.tsx

import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { MainContainer, LoginContainer } from './main.styles';
import { PrimaryButton, SecondaryButton } from './button.styles';

function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
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
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <MainContainer>
      <LoginContainer>
        <h1>Needle React App </h1>
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <LoginContainer>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
            <SecondaryButton onClick={handleSignUp}>Sign Up</SecondaryButton>
          </LoginContainer>
        )}
      </LoginContainer>
    </MainContainer>
  );
}

export default App;
