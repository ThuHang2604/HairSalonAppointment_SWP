import React from 'react';

export default function useAuth() {
  // const auth = JSON.parse(sessionStorage.getItem('auth')) || '';

  const [auth, setAuth] = React.useState(JSON.parse(sessionStorage.getItem('auth')) || '');

  const login = (userData) => {
    sessionStorage.setItem('auth', JSON.stringify(userData));
    setAuth(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('auth');
    setAuth('');
  };

  return { auth, login, logout };
}
