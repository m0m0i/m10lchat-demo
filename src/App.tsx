import React from "react";
import { SignIn } from "./SignIn";
import { Chat } from "./Chat";
import { useAuthContext } from "./auth/AuthProvider";

function App() {
  const { currentUser } = useAuthContext();

  return currentUser ? <Chat /> : <SignIn />;
}

export default App;
