import { useEffect, useState } from 'react';
import * as React from 'react';
import { supabase } from '../utils/createClient';

// Create context
export const AuthContext = React.createContext({});

// Context provider function
export function AuthContextProvider({ children }) {
  // Initialize useState of authorization checker
  const [isAuth, toggleIsAuth] = useState({
    authorization: false,
    status: 'pending',
  });

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      toggleIsAuth({
        authorization: true,
        status: 'done',
      });
    } else {
      toggleIsAuth({
        authorization: false,
        status: 'done',
      });
    }
  };

  // useEffect to check for a token in the local storage at every refresh
  useEffect(() => {
    getUser();
  }, []);

  // AuthContext provider, an object with the needed functions and states
  const data = {
    authorization: isAuth.authorization,
  };

  return (
    <AuthContext.Provider value={data}>
      {isAuth.status === 'done' ? children : <span className='h-screen flex justify-center items-center'>Loading...</span>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
