import { makeStyles } from "@material-ui/core";
import React from "react";
import ChatArea from "./chat/ChatArea";
import NotificationBar from "./NotificationBar";
import ChatTabProvider from "../contexts/ChatTabContext";

const useStyles = makeStyles(() => ({ root: { marginTop: 1 } }));

export default function Communication() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NotificationBar />
      <ChatTabProvider>
        <ChatArea />
      </ChatTabProvider>
    </div>
  );
}
