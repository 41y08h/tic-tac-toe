import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useVideoChat } from "../../../contexts/VideoChatContext";
import getMediaStream from "../../../utils/getMediaStream";
import RejectButton from "./RejectButton";

const useStyles = makeStyles(() => ({
  remoteVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    right: 0,
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
  userVideo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
  },
}));
export default function Connected() {
  const classes = useStyles();
  const { localStream, remoteStream, endCall } = useVideoChat();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    localVideoRef.current.srcObject = localStream;
    remoteVideoRef.current.srcObject = remoteStream;
  }, []);

  return (
    <>
      <video
        autoPlay
        ref={remoteVideoRef}
        className={classes.remoteVideo}
        onLoadedMetadata={(event) => event.target.play()}
      />
      <video
        muted
        autoPlay
        ref={localVideoRef}
        className={classes.userVideo}
        onLoadedMetadata={(event) => event.target.play()}
      />
      <div className={classes.actions}>
        <RejectButton onClick={endCall} />
      </div>
    </>
  );
}
