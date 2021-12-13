import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { useAuthContext } from "../auth/AuthProvider";
import { MessageFeed } from "../components/MessageFeed";
import { createMessagePacket } from "../service/beApiHandler";
import { signOut } from "../service/firebase";
import {
  clearLSValue,
  getPreferredLanguage,
  getSavedMessages,
  setLSValue,
} from "../service/lsHandler";
import { ChatProps, ReceivedMessage } from "../types";

export const Chat: React.FC<ChatProps> = ({ currentRoomInfo }) => {
  const { currentUser } = useAuthContext();

  const groupId = currentRoomInfo?.id;
  const roomName = currentRoomInfo?.name;
  const savedLanguage = currentUser && getPreferredLanguage(currentUser.uid);

  const [messages, setMessages] = useState<ReceivedMessage[] | []>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(
        `wss://${process.env.REACT_APP_SERVER_ADDRESS}/ws/chat`
      );

      const enterData = {
        type: "ENTER",
        text: "",
        sender: {
          name: currentUser?.displayName,
          lang: savedLanguage,
        },
        groupId,
      };

      socketRef.current.onopen = () => {
        socketRef.current?.send(JSON.stringify(enterData));
        console.log("Connected...");
      };
    }

    socketRef.current.onmessage = (event) => {
      const message: ReceivedMessage[] = JSON.parse(event.data);

      if (groupId) {
        const savedMessages: ReceivedMessage[] = getSavedMessages(groupId);
        // Update messages
        savedMessages.push(message[message.length - 1]);

        setLSValue(groupId, savedMessages);
        setMessages(savedMessages);
      }
    };

    socketRef.current.onerror = (event) => {
      console.log(`WebSocket Error: ${event}`);
    };

    return () => {
      console.log("Disconnected...");
      clearLSValue(currentRoomInfo?.id);
      socketRef.current?.close();
    };
  }, [currentRoomInfo, currentUser?.displayName, groupId, savedLanguage]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedMessage = newMessage.trim();

    setNewMessage("");

    if (trimmedMessage) {
      const messagePacket =
        currentUser &&
        createMessagePacket(currentUser, trimmedMessage, groupId);
      messagePacket && socketRef.current?.send(messagePacket);
    }
  };

  const _signOut = () => signOut();

  return (
    <Flex flexDirection="column" height="full">
      <Box overflow="auto" height="full">
        <Flex
          flexDirection="column"
          height="100vh"
          py="4"
          maxW="1024"
          mx="auto"
        >
          <Box border="2" borderColor="gray.200" py={8} mb={4} flex="1">
            <Flex justifyContent="space-between">
              <Heading fontSize="3xl" fontWeight="bold">
                {roomName}
              </Heading>
              <Button
                ml={24}
                color="currentColor"
                variant="ghost"
                onClick={_signOut}
              >
                Sign Out
              </Button>
            </Flex>
          </Box>
          <MessageFeed messages={messages} language={savedLanguage} />
          <Box mb="6" mx="4">
            {/* TODO: Design logic -> As a user I want to chage my preferred language in the room so that I can easily change the messages language */}
            {/* <LanguageSelector /> */}
            <Flex justifyContent={"flex-end"} mr="4">
              <Text
                fontSize={"xs"}
                color={"gray.400"}
              >{`Your preferred language is set as "${savedLanguage}"`}</Text>
            </Flex>
            <InputGroup mx="auto">
              <Input
                placeholder="Shoot a message"
                pr="4.5rem"
                bg="gray.100"
                variant="ghost"
                _focus={{ outline: "none" }}
                ref={inputRef}
                type="text"
                value={newMessage}
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
                  {"FIRE"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
