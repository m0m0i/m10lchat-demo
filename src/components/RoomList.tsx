import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  List,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { roomCreateHandler } from "../service/beApiHandler";
import { RoomListProps } from "../types";
import { Room } from "../types";
import { Card } from "./Card";
import { RoomListItem } from "./RoomListItem";

export const RoomList: React.FC<RoomListProps> = ({
  setRoomInfo,
  onRoomSelect,
}) => {
  const [groups, setGroups] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const url = `http://${process.env.REACT_APP_SERVER_ADDRESS}/chats/groups`;

  // TODO: Create Loading...

  useEffect(() => {
    const getGroups = async () => {
      try {
        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setGroups(data);
            setRoomInfo(data);
          });
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    getGroups();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoom(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewRoom("");
    const trimmedRoomName = newRoom.trim();
    if (trimmedRoomName) {
      const createdRoom = await roomCreateHandler(url, trimmedRoomName);
      onRoomSelect(createdRoom.name);
      setRoomInfo([createdRoom]);
    }
  };

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
              <RoomListItem room={room} onRoomSelect={onRoomSelect} key={key} />
            ))}
        </List>
        <Box mx="4" mt="4">
          <InputGroup mx="auto">
            <Input
              placeholder="Or create new room?"
              pr="4.5rem"
              bg="transparent"
              variant="ghost"
              _focus={{ outline: "none" }}
              ref={inputRef}
              type="text"
              value={newRoom}
              onChange={handleOnChange}
              flex="1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleOnSubmit(e);
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                variant="ghost"
                onClick={handleOnSubmit}
                _focus={{ outline: "none" }}
              >
                {"GO"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Card>
    </Box>
  );
};
