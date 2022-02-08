/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../service/firebase";
import { AuthContextProps } from "../types";

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
});

export const useAuthContext = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
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
