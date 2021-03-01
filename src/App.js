import React from "react";
import Board from "./components/Board";
import Heading from "./components/Heading";
import Communication from "./components/Communication";
import { makeStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  root: { maxWidth: "302px", margin: "auto" },
}));
export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Heading />
      <Board />
      <Communication />
      <ToastContainer />
    </div>
  );
}
