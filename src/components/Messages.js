import React, { useEffect, useRef } from "react";
import Message from "./Message";
import List from "@material-ui/core/List";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import { ListItem, ListItemText } from "@material-ui/core";

export default function Messages({ messages }) {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <List className="messages">
      <ListItem>
        <MobileScreenShareIcon color="action" />
        <ListItemText
          className="message-text"
          primary="Share this website to your friend to play!"
        />
      </ListItem>
      {messages.map((message, i) => {
        return <Message key={i} message={message} />;
      })}
      <div ref={lastMessageRef} />
    </List>
  );
}
