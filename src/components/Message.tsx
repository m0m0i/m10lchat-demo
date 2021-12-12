import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import React, { useState } from "react";

import { MessageProps } from "../types";

const formatDate = (date: Date): string => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

// TODO: set system message small and gray
export const Message: React.FC<MessageProps> = ({ message, language }, key) => {
  const { text, createdAt, photoURL, sender, translations } = message;

  const initialMessage = translations.filter(
    (message) => message.lang === language
  )[0].text;

  const [messageToBeDisplayed, setMessageToBeDisplayed] =
    useState<string>(initialMessage);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  if (!text) return null;

  const onChangeMessageLanguageHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOriginal(!showOriginal);
    showOriginal
      ? setMessageToBeDisplayed(initialMessage)
      : setMessageToBeDisplayed(text);
  };

  return (
    <Flex px="4" py="4" raunded="md" align="start">
      {photoURL ? (
        <Image
          src={photoURL}
          alt="Avatar"
          borderRadius="full"
          mr={4}
          w={45}
          h={45}
        />
      ) : null}
      <Box>
        <Flex align="center" mb={1}>
          {sender ? (
            <Text
              textColor={"purple.600"}
              mr={2}
              fontWeight="bold"
              fontSize="xs"
            >
              {sender}
            </Text>
          ) : null}
          {createdAt ? (
            <Box
              as="span"
              textColor={"gray.600"}
              fontSize="xs"
              alignContent="end"
            >
              {formatDate(new Date(createdAt))}
            </Box>
          ) : null}
        </Flex>
        <Text>{messageToBeDisplayed}</Text>
        {showOriginal ? (
          <Text
            as="button"
            textColor={"gray.400"}
            fontSize="xs"
            alignContent="end"
            onClick={onChangeMessageLanguageHandler}
          >
            {`show your language`}
          </Text>
        ) : (
          <Text
            as="button"
            textColor={"gray.400"}
            fontSize="xs"
            alignContent="end"
            onClick={onChangeMessageLanguageHandler}
          >
            {`show in original language`}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
