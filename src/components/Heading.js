import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Heading() {
  const useStyles = makeStyles(() => ({
    root: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "2.4rem",
      margin: "0.8rem 0",
      color: "tomato",
    },
    icon: { marginRight: "1rem" },
  }));
  const classes = useStyles();

  return (
    <h1 className={classes.root}>
      <i className={"fab fa-twitch " + classes.icon} />
      Tic Tac Toe
    </h1>
  );
}
