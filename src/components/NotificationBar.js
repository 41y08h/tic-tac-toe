import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import events from "../RTCs/events";
import useEventSubscription from "../hooks/useEventSubscription";

const useStyles = makeStyles(() => ({
  root: { padding: 20, backgroundColor: "#ff5e78", color: "white" },
  notification: {
    backgroundColor: "#f17d90",
    padding: "8px 2px",
    color: "white",
  },
}));

export default function NotificationBar() {
  const classes = useStyles();
  const [notification, setNotification] = useState("Connecting ...");

  useEventSubscription(events.notification, setNotification);

  return (
    <div className={classes.root}>
      <div className={classes.notification}>{notification}</div>
    </div>
  );
}
