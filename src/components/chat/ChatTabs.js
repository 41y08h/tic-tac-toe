import React from "react";
import { Tab, Tabs, makeStyles } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles(() => ({
  root: { backgroundColor: "#ff5e78", color: "white" },
  tabIndicator: {
    height: 4,
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
}));

export default function ChatTabs({ tabValue, setTabValue }) {
  const classes = useStyles();

  return (
    <Tabs
      color="inherit"
      variant="fullWidth"
      aria-label="chat tabs"
      value={tabValue}
      className={classes.root}
      onChange={(e, v) => setTabValue(v)}
      TabIndicatorProps={{ className: classes.tabIndicator }}
    >
      <Tab icon={<ChatBubbleIcon />} />
      <Tab icon={<VideocamIcon />} />
    </Tabs>
  );
}
