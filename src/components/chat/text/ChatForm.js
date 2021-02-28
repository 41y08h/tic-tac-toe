import React, { useState, useRef } from "react";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import socket from "../../../RTCs/configureSocket";
import events from "../../../RTCs/events";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: 57,
    display: "flex",
    padding: "4px 4px",
    borderTop: "1px solid #dbdbdb",
  },
  chatBox: { marginLeft: "1rem", flex: 1 },
}));

export default function ChatForm() {
  const classes = useStyles();
  const inputRef = useRef();
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit(events.message, message);

    setMessage("");
    inputRef.current.focus();
  }

  return (
    <Paper
      elevation={0}
      component="form"
      square
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <InputBase
        required
        className={classes.chatBox}
        placeholder="Send a message"
        value={message}
        ref={inputRef}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
