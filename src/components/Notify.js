import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

export default function Notify({ notification }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: "1px",
      width: "300px !important",
      margin: "0 auto",
      height: "3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white !important",
      backgroundColor: "tomato !important",
      textAlign: "left",
    },
  }));

  const classes = useStyles();
  return <Paper className={classes.root}>{notification}</Paper>;
}
