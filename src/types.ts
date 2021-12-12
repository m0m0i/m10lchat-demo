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

export interface ReceivedMessage {
  id: string;
  createdAt: string;
  lang: string;
  num: number;
  text: string;
  translations: {
    lang: string;
    text: string;
  }[];
  sender: string;
  photoURL?: string;
}

export interface SendMessage {
  type: string;
  text: string;
  sender: {
    uid: string;
    name: string;
    lang: string;
    photoURL: string;
  };
  groupId: string;
}

export interface MessageProps {
  message: ReceivedMessage;
  key?: number;
  language?: string | null | undefined;
}

export interface MessageFeedProps {
  messages: ReceivedMessage[];
  language: string | null | undefined;
}

export type GetLSValue = (key: string) => any;

export type SetLSValue = (
  key: string,
  value: ReceivedMessage[] | LocalUserInfo
) => any;

export type LanguageAndCode = [string, string];

export interface LocalUserInfo {
  language: string;
}
