import React, { useRef, useState } from "react";
import Message from "./Message";
import events from "../../../RTCs/events";
import HintTextItem from "./HintTextItem";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import useEventSubscription from "../../../hooks/useEventSubscription";
import useScrollGlue from "../../../hooks/useScrollGlue";

const useStyles = makeStyles(() => ({
  root: {
    height: 161,
    textAlign: "left",
    overflow: "hidden auto",
    backgroundColor: "white",
  },
}));

export default function Messages() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef();

  const addMessage = (...neww) => setMessages((old) => [...old, ...neww]);

  useEventSubscription(events.message, addMessage);
  useScrollGlue(bottomRef, messages);

  return (
    <List className={classes.root + " hideScrollBar"}>
      <HintTextItem />
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
      <div ref={bottomRef} />
    </List>
  );
}
