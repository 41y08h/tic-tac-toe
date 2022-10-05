import React from "react";
import Board from "./components/Board";
import Heading from "./components/Heading";
import Communication from "./components/Communication";
import { makeStyles } from "@material-ui/core";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
