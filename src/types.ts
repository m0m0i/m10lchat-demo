import { User } from "firebase/auth";
import React, { Dispatch } from "react";

export interface AuthContextProps {
  currentUser: User | null | undefined;
}

export interface RoomProps {
  currentRoom: string;
}

export interface ChatProps {
  currentRoomInfo: Room | undefined;
}

export interface Room {
  id: string;
  name: string;
  messageNum: number;
  users: string[];
}

export interface RoomListItemProps {
  room: Room;
  onRoomSelect: Dispatch<React.SetStateAction<string | undefined>>;
  key?: number;
}

export interface RoomGroups {
  groups: Room[];
}

export interface RoomListProps {
  setRoomInfo: Dispatch<React.SetStateAction<Room[] | undefined>>;
  onRoomSelect: Dispatch<React.SetStateAction<string | undefined>>;
}

export interface MessageProps {
  id: string;
  createdAt: string;
  lang: string;
  num: number;
  text: string;
  translation: {
    lang: string;
    text: string;
  }[];
  sender: string;
  photoURL?: string;
  key?: number;
}
