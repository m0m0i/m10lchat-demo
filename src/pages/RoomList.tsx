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

import { Card } from "../components/Card";
import { LanguageSelector } from "../components/LanguageSelector";
import { RoomListItem } from "../components/RoomListItem";
import { LandingContainer } from "../screens/LandingContainer";
import { roomCreateHandler } from "../service/beApiHandler";
import { RoomListProps } from "../types";
import { Room } from "../types";

// TODO: Create Loading...
export const RoomList: React.FC<RoomListProps> = ({
  setRoomInfo,
  onRoomSelect,
}) => {
  // Set the backend API server address
  const url = `http://${process.env.REACT_APP_SERVER_ADDRESS}/chats/groups`;

  const [groups, setGroups] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getGroups = async () => {
      try {
        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setGroups(data);
            setRoomInfo(data);
          });
      } catch (event) {
        console.log((event as Error).message);
      }
    };
    getGroups();
  }, [setRoomInfo, url]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoom(event.target.value);
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear input box
    setNewRoom("");

    const trimmedRoomName = newRoom.trim();
    if (trimmedRoomName) {
      const createdRoom = await roomCreateHandler(url, trimmedRoomName);
      onRoomSelect(createdRoom.name);
      setRoomInfo([createdRoom]);
    }
  };

  return (
    <LandingContainer>
      <Box maxW="xl" mx="auto" mt="100">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Please select your chat room!
        </Heading>
        <Card mt="8" maxW="xl">
          <LanguageSelector />
          <List spacing="4">
            {groups
              ?.sort((a: Room, b: Room) => a.messageNum - b.messageNum)
              ?.map((room: Room, key: number) => (
                <RoomListItem
                  room={room}
                  onRoomSelect={onRoomSelect}
                  key={key}
                />
              ))}
          </List>
          <Box mx="4" mt="4">
            <InputGroup mt={2} mx="auto">
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
    </LandingContainer>
  );
};
