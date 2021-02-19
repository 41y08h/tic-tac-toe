import React from "react";
import Messages from "./Messages";
import TopBar from "./TopBar";
import ChatForm from "./ChatForm";
import { makeStyles } from "@material-ui/core";

export default function InfoContainer() {
  const useStyles = makeStyles(() => ({
    wrapper: {
      border: "1px solid #dbdbdb",
      borderTop: "none",
      marginBottom: 36,
    },
  }));

  const classes = useStyles();
  return (
    <>
      <TopBar />
      <div className={classes.wrapper}>
        <Messages />
        <ChatForm />
      </div>
    </>
  );
}
