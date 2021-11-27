import React from "react";
import { SignIn } from "./SignIn";
import { Chat } from "./Chat";

function App() {
  // TODO: Clean up after implementing FB Auth stuff
  const user = true;

  return user ? <Chat /> : <SignIn />;
}

export default App;
