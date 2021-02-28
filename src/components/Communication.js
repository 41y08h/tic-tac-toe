import { makeStyles } from "@material-ui/core";
import React from "react";
import ChatArea from "./chat/ChatArea";
import NotificationBar from "./NotificationBar";

const useStyles = makeStyles(() => ({ root: { marginTop: 1 } }));

export default function Communication() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NotificationBar />
      <ChatArea />
    </div>
  );
}
