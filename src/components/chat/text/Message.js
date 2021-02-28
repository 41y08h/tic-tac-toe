import React from "react";
import { makeStyles } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import socket from "../../../RTCs/configureSocket";

const useStyles = makeStyles(() => ({ text: { marginLeft: "12px" } }));

function MessageIcon({ message }) {
  const isMessageMine = message.bySocketId === socket.id;

  return (
    <>
      {isMessageMine ? (
        <FaceIcon color="action" />
      ) : (
        <PersonIcon color="action" />
      )}
    </>
  );
}

export default function Message({ message }) {
  const classes = useStyles();

  return (
    <ListItem>
      <MessageIcon {...{ message }} />
      <ListItemText className={classes.text}>{message.text}</ListItemText>
    </ListItem>
  );
}
