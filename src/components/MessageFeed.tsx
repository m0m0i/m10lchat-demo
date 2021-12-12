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
