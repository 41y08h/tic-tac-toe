import React from "react";
import Idle from "./Idle";
import Calling from "./Calling";
import IncomingCall from "./IncomingCall";
import Connected from "./Connected";
import { makeStyles } from "@material-ui/core";
import { useVideoChat } from "../../../contexts/VideoChatContext";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    height: "100%",
  },
}));
export default function VideoChat() {
  const classes = useStyles();
  const { callStatus } = useVideoChat();

  return (
    <div className={classes.root}>
      {callStatus === "IDLE" && <Idle />}
      {callStatus === "CALLING" && <Calling />}
      {callStatus === "INCOMING" && <IncomingCall />}
      {callStatus === "CONNECTED" && <Connected />}
    </div>
  );
}
