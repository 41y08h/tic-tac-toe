import { makeStyles } from "@material-ui/core";
import React from "react";

export default function Square(props) {
  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: "tomato",
      color: "white",
      fontSize: "2rem",
    },
  }));
  const classes = useStyles();
  return (
    <button className={classes.root} {...props}>
      {props.value}
    </button>
  );
}
