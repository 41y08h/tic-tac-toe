import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Square from "./Square";
import events from "../RTCs/events";
import useEventSubscription from "../hooks/useEventSubscription";

const useStyles = makeStyles(() => ({
  root: {
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gridTemplateRows: "repeat(3, 100px)",
    gap: "1px",
    overflow: "hidden",
    width: "fit-content",
    margin: "0 auto",
  },
}));

export default function Board() {
  const classes = useStyles();
  const [board, setBoard] = useState(Array(9).fill(""));

  useEventSubscription(events.play, setBoard);

  return (
    <div className={classes.root}>
      {board.map((value, index) => (
        <Square key={index} value={value} index={index} />
      ))}
    </div>
  );
}
