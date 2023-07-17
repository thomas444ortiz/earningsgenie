import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    axios.post('/api/check_token', {token: localStorage.getItem('token')})
    .then(response => {
        if (response.status === 200) {
            setIsLoggedIn(true);
            setUserEmail(response.data.email);
        } else {
            setIsLoggedIn(false);
        }
    })
    .catch(error => {
        setIsLoggedIn(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
