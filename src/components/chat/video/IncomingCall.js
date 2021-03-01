import { makeStyles } from "@material-ui/core";
import { Call, CallEnd } from "@material-ui/icons";
import React from "react";
import { useVideoChat } from "../../../contexts/VideoChatContext";
import ActionButton from "./ActionButton";
import RejectButton from "./RejectButton";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
    marginTop: 20,
  },
}));
export default function IncomingCall() {
  const classes = useStyles();
  const { answerCall, rejectCall } = useVideoChat();

  return (
    <div className={classes.root}>
      <p>Your opponent is calling you</p>
      <div className={classes.buttons}>
        <RejectButton onClick={rejectCall} />
        <ActionButton color="green" icon={Call} onClick={answerCall} />
      </div>
    </div>
  );
}
