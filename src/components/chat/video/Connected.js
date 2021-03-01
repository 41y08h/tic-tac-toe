import { makeStyles } from "@material-ui/core";
import React from "react";
import { useVideoChat } from "../../../contexts/VideoChatContext";
import RejectButton from "./RejectButton";

const useStyles = makeStyles(() => ({
  video: {
    width: "100%",
    height: "100%",
  },
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 60,
    paddingRight: 20,
    paddingBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
  },
}));
export default function Connected() {
  const classes = useStyles();
  const { videoRef, endCall } = useVideoChat();

  return (
    <>
      <video
        className={classes.video}
        autoPlay
        ref={videoRef}
        onLoadedMetadata={(event) => event.target.play()}
      />
      <div className={classes.actions}>
        <RejectButton onClick={endCall} />
      </div>
    </>
  );
}
