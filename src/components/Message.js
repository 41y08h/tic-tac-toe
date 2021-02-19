import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FaceIcon from "@material-ui/icons/Face";
import PersonIcon from "@material-ui/icons/Person";
import { useGame } from "../contexts/GameContext";
import { makeStyles } from "@material-ui/core";

export default function Message({ message }) {
  const { socket } = useGame();

  const useStyles = makeStyles(() => ({
    messageText: { marginLeft: "12px" },
  }));
  const classes = useStyles();

  const isMine = message.bySocketId === socket.id;
  return (
    <ListItem>
      {isMine ? <FaceIcon color="action" /> : <PersonIcon color="action" />}
      <ListItemText className={classes.messageText}>
        {message.text}
      </ListItemText>
    </ListItem>
  );
}
