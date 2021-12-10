import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

import { useAuthContext } from "../auth/AuthProvider";
import { Message } from "../components/Message";
import { signOut } from "../service/firebase";
import { clearLSValue, getLSValue, setLSValue } from "../service/lsHandler";
import misc from "../styles/misc.module.css";
import { ChatProps, MessageFeedProps, MessageProps } from "../types";

export const Chat: React.FC<ChatProps> = ({ currentRoomInfo }) => {
  const { currentUser } = useAuthContext();

  // console.log(currentRoomInfo);
  const groupId = currentRoomInfo?.id;

  const [messages, setMessages] = useState<MessageProps[] | []>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const enterData = {
    type: "ENTER",
    text: "",
    sender: {
      name: currentUser?.displayName,
      lang: "ja",
    },
    groupId,
  };

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(
        `ws://${process.env.REACT_APP_SERVER_ADDRESS}/ws/chat`
      );
      console.log("Connected...");
      socketRef.current.onopen = () => {
        socketRef.current?.send(JSON.stringify(enterData));
      };
    }

    socketRef.current.onmessage = (e) => {
      const message: MessageProps[] = JSON.parse(e.data);
      console.log("get messages from the server");
      console.log(message);
      const savedMessages: MessageProps[] = getLSValue(currentRoomInfo?.id);

      savedMessages.push(message[message.length - 1]);
      const updatedMessages = setLSValue(currentRoomInfo?.id, savedMessages);
      setMessages(updatedMessages);
    };

    return () => {
      console.log("Disconnected...");
      clearLSValue(currentRoomInfo?.id);
      socketRef.current?.close();
    };
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();

    setNewMessage("");

    if (trimmedMessage) {
      const messeageToBeSent = {
        type: "TALK",
        text: trimmedMessage,
        sender: {
          uid: currentUser?.uid,
          name: currentUser?.displayName,
          lang: "ja",
          photoURL: currentUser?.photoURL,
        },
        groupId: groupId,
      };
      socketRef.current?.send(JSON.stringify(messeageToBeSent));
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
              <Text fontSize="2rem" fontWeight="bold">
                Multilingual Chat x Antidote demo
              </Text>
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
          <MessageFeed messages={messages} />
          <Box mb="6" mx="4">
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

export const MessageFeed: React.FC<MessageFeedProps> = ({ messages }) => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  }, []);

  return (
    <ScrollableFeed className={misc.hideScroll}>
      {messages
        ?.sort((a: MessageProps, b: MessageProps) =>
          a?.createdAt <= b?.createdAt ? -1 : 1
        )
        ?.map((message: MessageProps, key: number) => (
          <Message {...message} key={key} />
        ))}
      <div ref={scrollBottomRef} />
    </ScrollableFeed>
  );
};
