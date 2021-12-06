import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { RoomListItemProps } from "../types";

export const RoomListItem: React.FC<RoomListItemProps> = ({
  id,
  name,
  users,
  messageNum,
  key,
  empty,
  handleSelectRoom,
}) => {
  if (!id) <p>{`There's no room yet`}</p>;

  return (
    <Flex rounded="md" align="flex-end">
      <Avatar name={name} src="https://bit.ly/broken-link" size="xs" />
      <Text
        as="button"
        onClick={() => handleSelectRoom(name)}
        mx="4"
        fontWeight="bold"
        fontSize="lg"
      >
        {name}
      </Text>
      <Text fontWeight="light" fontSize="xs">
        {`${users.length} users ${messageNum} messages`}
      </Text>
    </Flex>
  );
};
