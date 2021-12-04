import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  DocumentData,
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

import { useAuthContext } from "../auth/AuthProvider";
import { Message, MessageProps } from "../components/Message";
import { db, signOut } from "../service/firebase";
import { useFirestoreQuery } from "../service/hooks";
import misc from "../styles/misc.module.css";

const _signOut = () => signOut();

export const Chat: React.FC = () => {
  const { currentUser } = useAuthContext();

  const [newMessage, setNewMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const messagesRef = collection(db, "messages");
  const messages = useFirestoreQuery(query(messagesRef, orderBy("createdAt")));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();

    if (trimmedMessage) {
      // Add new message in Firestore
      await addDoc(messagesRef, {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        uid: currentUser?.uid,
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
      });

      // Clear input field
      setNewMessage("");
    }
  };

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
                bg="transparent"
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

export const MessageFeed: React.FC<DocumentData> = ({ messages }) => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  }, []);

  return (
    <ScrollableFeed className={misc.hideScroll}>
      {messages
        ?.sort((a: MessageProps, b: MessageProps) =>
          a?.createdAt?.seconds <= b?.createdAt?.seconds ? -1 : 1
        )
        ?.map((message: MessageProps, key: number) => (
          <Message {...message} key={key} />
        ))}
      <div ref={scrollBottomRef} />
    </ScrollableFeed>
  );
};
