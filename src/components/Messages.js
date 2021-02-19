import React, { useEffect, useRef } from "react";
import Message from "./Message";
import List from "@material-ui/core/List";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useGame } from "../contexts/GameContext";

function HintTextItem() {
  const useStyles = makeStyles(() => ({
    hintText: {
      fontSize: ".8rem !important",
    },
    hintTextWrapper: {
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  return (
    <ListItem button>
      <ListItemText className={classes.hintTextWrapper}>
        <span className={classes.hintText}>
          Share this website with your friend to play!
        </span>
      </ListItemText>
    </ListItem>
  );
}

export default function Messages() {
  const { messages } = useGame();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const useStyles = makeStyles(() => ({
    root: {
      height: "130px",
      textAlign: "left",
      overflow: "hidden auto",
      backgroundColor: "white",
    },
  }));

  const classes = useStyles();

  return (
    <List className={classes.root + " hideScrollBar"}>
      <HintTextItem />
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
      <div ref={lastMessageRef} />
    </List>
  );
}
