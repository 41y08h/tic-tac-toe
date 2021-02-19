import React, { useState, useRef } from "react";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import events from "../events";
import { makeStyles } from "@material-ui/core";
import { useGame } from "../contexts/GameContext";

export default function ChatForm() {
  const { socket } = useGame();
  const [message, setMessage] = useState("");
  const chatInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    socket.emit(events.message, message);

    setMessage("");
    // Focus chat input after submission
    const chatInput = chatInputRef.current;
    chatInput.focus();
  }

  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      padding: "4px 4px",
      borderTop: "1px solid #dbdbdb",
    },
    chatBox: { marginLeft: "1rem", flex: 1 },
  }));

  const classes = useStyles();

  return (
    <Paper
      component="form"
      elevation={0}
      square
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <InputBase
        required
        className={classes.chatBox}
        placeholder="Send a message"
        ref={chatInputRef}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <IconButton aria-label="chat" type="submit">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
