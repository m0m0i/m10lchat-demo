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
