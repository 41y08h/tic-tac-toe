import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import archesImage from "../../../assets/arches.png";
import socket from "../../../RTCs/configureSocket";
import events from "../../../RTCs/events";
import createPeer from "../../../RTCs/createPeer";
import useEventSubscription from "../../../hooks/useEventSubscription";
import InCall from "./states/InCall";
import Calling from "./states/Calling";
import Idle from "./states/Idle";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${archesImage})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "relative",
  },
  callButton: { padding: 20, border: "8px solid #eee" },
}));
let peer;

export default function VideoChat({ setTabValue }) {
  const classes = useStyles();
  const videoRef = useRef();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [opponentId, setOpponentId] = useState(null);
  const [callStatus, setCallStatus] = useState("idle");

  function onCallButtonClicked() {
    setIsDialogOpen(true);
  }

  function endCall() {
    socket.emit(events.endCall);
    setCallStatus("idle");
    peer && peer.destroy();
  }

  useEventSubscription(events.opponentId, setOpponentId);
  useEventSubscription(events.opponentIsCalling, () => {
    peer = createPeer();
    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true, facingMode: "user" })
        .then((stream) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setCallStatus("inCall");
            setTabValue(1);
            const video = videoRef.current;
            video.srcObject = remoteStream;
          });
        });
    });
  });
  useEventSubscription(events.endCall, () => {
    setCallStatus("idle");
  });

  return (
    <div className={classes.root}>
      {callStatus === "idle" && (
        <Idle ref={videoRef} {...{ opponentId, setCallStatus }} />
      )}
      {callStatus === "calling" && <Calling />}
      {callStatus === "inCall" && (
        <InCall ref={videoRef} opponentId={opponentId} onEndCall={endCall} />
      )}
    </div>
  );
}
