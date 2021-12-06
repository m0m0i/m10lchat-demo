import React, { useState } from "react";

import { Chat } from "./Chat";
import { RoomList } from "./RoomList";

export const RoomSelector: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<string | undefined>(undefined);

  return currentRoom ? (
    <Chat currentRoom={currentRoom} />
  ) : (
    <RoomList currentRoom={currentRoom} onRoomSelect={setCurrentRoom} />
  );
};
