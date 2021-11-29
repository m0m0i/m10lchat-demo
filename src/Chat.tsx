import React from "react";
import {
  Button,
  Center,
  Flex,
  Box,
  Input,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";
import misc from "./styles/misc.module.css";
import { signOut } from "./service/firebase";
import { useAuthContext } from "./auth/AuthProvider";

export const Chat: React.FC = () => {
  //TODO: impolement authentication checker

  //TODO: Clean up after implementing the chat feature with firestore
  const { currentUser } = useAuthContext();
  console.log(currentUser);

  const me = true;
  const unsentMessages = [
    {
      id: "00000",
      text: "I am also a message",
      sender: "somebody",
      createdAt: "2021-11-26T01:10:51.634Z",
      updatedAt: "2021-11-26T01:10:51.634Z",
    },
    {
      id: "00002",
      text: "Did you see this?",
      sender: "anybody",
      createdAt: "2021-11-26T01:10:11.634Z",
      updatedAt: "2021-11-26T01:10:11.634Z",
    },
  ];
  const messages = [
    {
      id: "00001",
      text: "I am a message",
      sender: "me",
      createdAt: "2021-11-26T01:10:31.634Z",
      updatedAt: "2021-11-26T01:10:31.634Z",
    },
  ];

  //TODO: implement this with the Backend
  const fireMessage = async (input: string) => {
    console.log(`message to be sent is: ${input}`);
  };

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
            me={me}
            unsentMessages={unsentMessages}
            messages={messages}
          />
          <Flex px={4} height={20} alignItems="center">
            <Input
              placeholder="Shoot a message"
              size="lg"
              bg="white"
              _focus={{ outline: "none" }}
              onKeyPress={(e) => {
                const value = e.currentTarget.value;
                if (
                  e.key === "Enter" &&
                  value.trim().length > 0 &&
                  unsentMessages.length === 0
                ) {
                  fireMessage(value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </Flex>
        </Box>
        <Button color="currentColor" valiant="outline" onClick={signOut}>
          <Text as="span" align="center">
            Sign out.
          </Text>
        </Button>
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
  messages: Array<Message>;
  unsentMessages: Array<Message>;
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
