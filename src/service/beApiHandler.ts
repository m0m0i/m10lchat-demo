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
import { User } from "firebase/auth";

import { Room } from "../types";

const createURLSearchParams = (data: string) => {
  const params = new URLSearchParams();
  params.append("name", data);
  return params;
};

export const roomCreateHandler = async (url: string, data: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: createURLSearchParams(data),
  };

  const createdRoom: Promise<Room> = await fetch(url, options)
    .then((response) => response.json())
    .then((room) => room)
    .catch((err) => console.log(err));

  return createdRoom;
};

export const createMessagePacket = (
  currentUser: User,
  message: string,
  groupId: string | undefined
): string => {
  const { uid, displayName, photoURL } = currentUser;

  return JSON.stringify({
    type: "TALK",
    text: message,
    sender: {
      uid: uid,
      name: displayName,
      lang: "ja",
      photoURL: photoURL,
    },
    groupId,
  });
};
