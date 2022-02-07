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
