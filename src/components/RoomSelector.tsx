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
