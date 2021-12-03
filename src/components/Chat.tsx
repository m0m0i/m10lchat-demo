import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  DocumentData,
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

import { useAuthContext } from "../auth/AuthProvider";
import { db, signOut } from "../service/firebase";
import { useFirestoreQuery } from "../service/hooks";
import misc from "./styles/misc.module.css";

const _signOut = () => signOut();

export const Chat: React.FC = () => {
  const { currentUser } = useAuthContext();

  if (currentUser !== undefined && currentUser !== null) {
    const { uid, displayName, photoURL } = currentUser;
  }
  const [newMessage, setNewMessage] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomListRef = useRef<HTMLDivElement>(null);

  const messagesRef = collection(db, "messages");
  const messages = useFirestoreQuery(query(messagesRef, orderBy("createdAt")));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
      // Scroll down to the bottom of the list
      bottomListRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const me = currentUser?.displayName;

  return (
    <Center>
      <Flex
        w="100%"
        maxW={1200}
        height={800}
        maxHeight="calc(100vh - 2rem)"
        flexDirection="column"
        px={{ base: "4", lg: "8" }}
      >
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
        <Box
          maxHeight="100%"
          height="100%"
          mt="50"
          bg={useColorModeValue("gray.50", "inherit")}
          pb={20}
          borderRadius={12}
          overflow="hidden"
          boxShadow="0 2px 2px #0f0f0f04"
        >
          <MessageFeed
            me={true}
            unsentMessages={messages}
            messages={messages}
          />
          <Box ref={bottomListRef} />
          <Flex px={4} height={20} alignItems="center">
            <Input
              placeholder="Shoot a message"
              size="lg"
              bg="white"
              variant="ghost"
              _focus={{ outline: "none" }}
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleOnSubmit(e);
                }
              }}
            />
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
};

export type Message = {
  __typename?: "Message";
  id: string;
  text: string;
  sender: string;
  createdAt: string;
  updatedAt: string;
};

interface MessageFeedProps {
  messages: DocumentData[];
  unsentMessages: DocumentData[];
  me: Boolean;
}

export const MessageFeed: React.FC<MessageFeedProps> = ({
  unsentMessages,
  me,
  messages,
}) => (
  <ScrollableFeed className={misc.hideScroll}>
    <Box p={6}>
      {messages?.map((message: any, key: number) => (
        <MessageBox message={message} isMine={me} isUnsent={false} key={key} />
      ))}
      {unsentMessages?.map((message: any, key: number) => (
        <MessageBox
          message={message}
          isMine={false}
          isUnsent={true}
          key={key}
        />
      ))}
    </Box>
  </ScrollableFeed>
);

interface MessageProps {
  message: Message;

  isMine: Boolean;
  isUnsent: Boolean;
}

export const MessageBox: React.FC<MessageProps> = ({
  message,
  isUnsent,
  isMine,
}) => (
  <Flex my={2} p={2}>
    <Flex flexDirection="column" width="100%">
      <Tag
        variant="subtle"
        mb={2}
        bg={isMine ? "_purple" : "gray.500"}
        color="white"
        ml={isMine ? "auto" : undefined}
        mr={isMine ? undefined : "auto"}
      >
        {message?.sender}
      </Tag>
      <Flex
        bg="gray.50"
        pr={2}
        py={2}
        pl={4}
        borderRadius={12}
        boxShadow="0 2px 2px #0f0f0f0f"
        ml={isMine ? "auto" : undefined}
        mr={isMine ? undefined : "auto"}
      >
        <Text fontSize={15} maxWidth={400}>
          {message?.text}
        </Text>
        <Flex
          ml="auto"
          mt="auto"
          pl={4}
          alignItems="center"
          justifyContent="flex-end"
        >
          {isUnsent ? (
            <>
              <Text fontSize={12} color="gray.500">
                {moment().format("hh:mm A")}
              </Text>
              {isMine ? (
                <CheckCircleIcon fontSize={12} ml={2} color="gray.400" />
              ) : null}
            </>
          ) : (
            <>
              <Text fontSize={12} color="gray.500">
                {moment(message?.createdAt).format("hh:mm A")}
              </Text>
              {isMine ? (
                <CheckCircleIcon fontSize={12} ml={2} color="green.400" />
              ) : null}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
