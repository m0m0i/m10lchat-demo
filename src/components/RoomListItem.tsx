import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { RoomListItemProps } from "../types";

export const RoomListItem: React.FC<RoomListItemProps> = (
  { room, onRoomSelect },
  key
) => {
  const { id, name, users, messageNum } = room;
  if (!id) <p>{`There's no room yet`}</p>;

  return (
    <Flex rounded="md" align="flex-end">
      <Avatar name={name} src="" size="xs" getInitials={(n: string) => n[0]} />
      <Text
        as="button"
        onClick={() => onRoomSelect(name)}
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
