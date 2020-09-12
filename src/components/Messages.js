import React, { useEffect, useRef } from "react";
import Message from "./Message";
import List from "@material-ui/core/List";

export default function Messages({ messages }) {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <List className="messages">
      {messages.map((message, i) => {
        return <Message key={i} message={message} />;
      })}
      <div ref={lastMessageRef} />
    </List>
  );
}
