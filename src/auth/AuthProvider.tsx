import { User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../service/firebase";
import { AuthContextProps } from "../types";

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const useAuthContext = (): AuthContextProps => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuthContext };
