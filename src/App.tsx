import React from "react";

import { useAuthContext } from "./auth/AuthProvider";
import { RoomSelector } from "./components/RoomSelector";
import { SignIn } from "./components/SignIn";

export const App: React.FC = () => {
  const { currentUser } = useAuthContext();

  return currentUser ? <RoomSelector /> : <SignIn />;
};
