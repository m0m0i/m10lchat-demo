import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";

import { RoomListProps } from "../types";
import { Room } from "../types";
import { Card } from "./Card";
import { RoomListItem } from "./RoomListItem";
import { RoomSelector } from "./RoomSelector";

export const RoomList: React.FC<RoomListProps> = ({
  currentRoom,
  onRoomSelect,
}) => {
  const groups: Room[] = [
    {
      id: "41e98a97-47e4-4e56-a114-9b42716633ea",
      name: "Hey I am actually a room",
      messageNum: 0,
      users: [],
      empty: true,
    },
    {
      id: "fcad1dd1-9002-4793-9c4c-6a04d8999a5b",
      name: "Hey I am a room",
      messageNum: 0,
      users: [],
      empty: true,
    },
    {
      id: "1a4bc5e1-6a89-4f63-9290-78f975cfbc3b",
      name: "Hey I am also a room",
      messageNum: 0,
      users: [],
      empty: true,
    },
  ];

  return (
    <Box maxW="xl" mx="auto" mt="200">
      <Heading textAlign="center" size="lg" fontWeight="extrabold">
        Please select your chat room!
      </Heading>
      <Card>
        <List spacing="4">
          {groups
            ?.sort((a: Room, b: Room) => a.messageNum - b.messageNum)
            ?.map((room: Room, key: number) => (
              <RoomListItem
                {...room}
                key={key}
                handleSelectRoom={onRoomSelect}
              />
            ))}
        </List>
      </Card>
    </Box>
  );
};
