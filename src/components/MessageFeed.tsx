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
import React, { useLayoutEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";

import misc from "../styles/misc.module.css";
import { MessageFeedProps, ReceivedMessage } from "../types";
import { Message } from "./Message";

export const MessageFeed: React.FC<MessageFeedProps> = ({
  messages,
  language,
}) => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  }, []);

  return (
    <ScrollableFeed className={misc.hideScroll}>
      {messages
        ?.sort((a: ReceivedMessage, b: ReceivedMessage) =>
          a?.createdAt <= b?.createdAt ? -1 : 1
        )
        ?.map((message: ReceivedMessage, key: number) => (
          <Message message={message} language={language} key={key} />
        ))}
      <div ref={scrollBottomRef} />
    </ScrollableFeed>
  );
};
