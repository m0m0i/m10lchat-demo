import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import React from "react";

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

export const Message: React.FC<MessageProps> = ({ ...message }, key) => {
  const { text, createdAt, photoURL, sender } = message;
  if (!text) return null;

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
        <Text>{text}</Text>
      </Box>
    </Flex>
  );
};
