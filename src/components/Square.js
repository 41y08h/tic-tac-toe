import React from "react";
import events from "../RTCs/events";
import socket from "../RTCs/configureSocket";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "tomato",
    fontSize: "2rem",
    color: "white",
  },
}));

export default function Square({ index, value }) {
  const classes = useStyles();
  const onPlay = () => socket.emit(events.play, index);

  return (
    <button className={classes.root} onClick={onPlay}>
      {value}
    </button>
  );
}
