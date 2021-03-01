import React from "react";
import { Tab, Tabs, makeStyles } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useChatTab } from "../../contexts/ChatTabContext";

const useStyles = makeStyles(() => ({
  root: { backgroundColor: "#ff5e78", color: "white" },
  tabIndicator: {
    height: 4,
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
}));

export default function ChatTabs() {
  const classes = useStyles();
  const { tab, setTab } = useChatTab();

  function changeTab(event, tabValue) {
    setTab(tabValue);
  }

  return (
    <Tabs
      color="inherit"
      variant="fullWidth"
      aria-label="chat tabs"
      value={tab}
      className={classes.root}
      onChange={changeTab}
      TabIndicatorProps={{ className: classes.tabIndicator }}
    >
      <Tab icon={<ChatBubbleIcon />} />
      <Tab icon={<VideocamIcon />} />
    </Tabs>
  );
}
