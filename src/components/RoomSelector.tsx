import React, { useEffect, useState } from "react";

import { Chat } from "../pages/Chat";
import { RoomList } from "../pages/RoomList";
import { Room } from "../types";

export const RoomSelector: React.FC = () => {
  const [roomInfo, setRoomInfo] = useState<Room[] | undefined>(undefined);
  const [currentRoom, setCurrentRoom] = useState<string | undefined>(undefined);
  const [currentRoomInfo, setCurrentRoomInfo] = useState<Room | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentRoom && roomInfo) {
      const selectedRoom = roomInfo.filter((room) => currentRoom === room.name);
      selectedRoom[0]?.name &&
        console.log(`Your selected room: ${selectedRoom[0].name}`);
      setCurrentRoomInfo(selectedRoom[0]);
    }
  }, [setCurrentRoomInfo, currentRoom, roomInfo]);

  return currentRoomInfo ? (
    <Chat currentRoomInfo={currentRoomInfo} />
  ) : (
    <RoomList setRoomInfo={setRoomInfo} onRoomSelect={setCurrentRoom} />
  );
};
