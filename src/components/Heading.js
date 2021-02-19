import { makeStyles } from "@material-ui/core";
import React from "react";

export default function Heading() {
  const useStyles = makeStyles(() => ({
    root: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "2.4rem",
      color: "tomato",
      margin: "0.8rem 0",
    },
  }));
  const classes = useStyles();
  return (
    <h1 className={classes.root}>
      <i className="fab fa-twitch"></i>&nbsp; Tic Tac Toe
    </h1>
  );
}
