import { IconButton, makeStyles } from "@material-ui/core";
import { CallEnd } from "@material-ui/icons";
import React from "react";
import { useVideoChat } from "../../../contexts/VideoChatContext";
import RejectButton from "./RejectButton";

const useStyles = makeStyles(() => ({
  text: { marginBottom: 20 },
}));
export default function Calling() {
  const classes = useStyles();
  const { endCall } = useVideoChat();

  return (
    <>
      <span className={classes.text}>Calling</span>
      <RejectButton onClick={endCall} />
    </>
  );
}
