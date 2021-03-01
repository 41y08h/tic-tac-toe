import React from "react";
import { makeStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import ChatTabs from "./ChatTabs";
import TextChat from "./text/TextChat";
import VideoChat from "./video2/VideoChat";
import { useChatTab } from "../../contexts/ChatTabContext";
import VideoChatProvider from "../../contexts/VideoChatContext";

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
  const classes = useStyles();
  const { tab, setTab } = useChatTab();

  return (
    <>
      <ChatTabs />
      <SwipeableViews
        axis="x"
        index={tab}
        onChangeIndex={setTab}
        className={classes.views}
      >
        <TextChat />
        <VideoChatProvider>
          <VideoChat />
        </VideoChatProvider>
      </SwipeableViews>
    </>
  );
}
