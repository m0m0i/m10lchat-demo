import { User } from "firebase/auth";
import { Dispatch } from "react";

export interface AuthContextProps {
  currentUser: User | null | undefined;
}

export interface RoomProps {
  currentRoom: string | undefined;
}

export interface ChatProps extends RoomProps {}

export interface Room {
  id: string;
  name: string;
  messageNum: number;
  users: string[];
  empty?: boolean;
  key?: number;
}

export interface RoomListItemProps extends Room {
  handleSelectRoom: Dispatch<React.SetStateAction<string | undefined>>;
}

export interface RoomGroups {
  groups: Room[];
}

export interface RoomListProps extends RoomProps {
  onRoomSelect: Dispatch<React.SetStateAction<string | undefined>>;
}

export interface MessageProps {
  createdAt: {
    seconds: number;
  };
  text: string;
  displayName: string;
  photoURL: string;
  key?: number;
}
