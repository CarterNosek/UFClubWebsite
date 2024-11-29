import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    console.log('Stored token string:', tokenString); // Diagnostic log
    
    try {
      const userToken = JSON.parse(tokenString);
      console.log('Parsed user token:', userToken); // Diagnostic log
      return userToken?.token;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log('Saving token:', userToken); // Diagnostic log
    
    // Ensure userToken is an object with a token property
    const tokenToStore = userToken.token 
      ? { token: userToken.token }
      : { token: userToken };
    
    sessionStorage.setItem('token', JSON.stringify(tokenToStore));
    setToken(tokenToStore.token);
  };
  
  return {setToken: saveToken, token}
}