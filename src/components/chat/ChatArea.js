import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import ChatTabs from "./ChatTabs";
import TextChat from "./text/TextChat";
import VideoChat from "./video/VideoChat";

const useStyles = makeStyles(() => ({
  views: {
    height: 220,
    marginBottom: 36,
    border: "1px solid #dbdbdb",
    borderTop: "1px solid #eee",
    backgroundColor: "white",
    overflow: "hidden",
  },
}));

export default function ChatArea() {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();

  return (
    <>
      <ChatTabs {...{ tabValue, setTabValue }} />
      <SwipeableViews
        className={classes.views}
        index={tabValue}
        onChangeIndex={setTabValue}
        axis="x"
      >
        <TextChat />
        <VideoChat setTabValue={setTabValue} />
      </SwipeableViews>
    </>
  );
}
