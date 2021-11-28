import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../service/firebase';

type AuthContextProps = {
  currentUser: User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(user => setCurrentUser(user));
  }, []);

  return(
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };
