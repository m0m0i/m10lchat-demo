import React from "react";

import { useAuthContext } from "./auth/AuthProvider";
import { Chat } from "./components/Chat";
import { SignIn } from "./components/SignIn";

export const App: React.FC = () => {
  const { currentUser } = useAuthContext();

  return currentUser ? <Chat /> : <SignIn />;
};
