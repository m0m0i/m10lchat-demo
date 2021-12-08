import React, { useEffect, useState } from "react";

import { Room } from "../types";
import { Chat } from "./Chat";
import { RoomList } from "./RoomList";

export const RoomSelector: React.FC = () => {
  const [roomInfo, setRoomInfo] = useState<Room[] | undefined>(undefined);
  const [currentRoom, setCurrentRoom] = useState<string | undefined>(undefined);
  const [currentRoomInfo, setCurrentRoomInfo] = useState<Room | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentRoom && roomInfo) {
      const selectedRoom = roomInfo.filter((room) => currentRoom === room.name);
      console.log(selectedRoom);
      setCurrentRoomInfo(selectedRoom[0]);
    }
  });

  return currentRoomInfo ? (
    <Chat currentRoomInfo={currentRoomInfo} />
  ) : (
    <RoomList setRoomInfo={setRoomInfo} onRoomSelect={setCurrentRoom} />
  );
};
