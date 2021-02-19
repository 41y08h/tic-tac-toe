import { makeStyles } from "@material-ui/core";
import React from "react";
import Square from "./Square";
import { useGame } from "../contexts/GameContext";
import events from "../events";

export default function Board({ values }) {
  const { socket, board } = useGame();

  function onPlay(e) {
    socket.emit(events.play, e.target.id);
  }

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {board.map((value, index) => (
        <Square value={value} onClick={onPlay} id={index} key={index} />
      ))}
    </div>
  );
}
