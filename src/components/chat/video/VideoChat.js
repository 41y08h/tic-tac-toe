import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import archesImage from "../../../assets/arches.png";
import socket from "../../../RTCs/configureSocket";
import events from "../../../RTCs/events";
import createPeer from "../../../RTCs/createPeer";
import useEventSubscription from "../../../hooks/useEventSubscription";
import InCall from "./statuses/InCall";
import Calling from "./statuses/Calling";
import Idle from "./statuses/Idle";
import Incoming from "./statuses/Incoming";

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

export default function VideoChat({ setTabValue }) {
  const classes = useStyles();
  const videoRef = useRef();
  const [opponentId, setOpponentId] = useState(null);
  const [callStatus, setCallStatus] = useState("idle");

  function endCall() {
    socket.emit(events.endCall);
    setCallStatus("idle");
  }

  useEventSubscription(events.opponentId, setOpponentId);
  useEventSubscription(events.opponentIsCalling, () => {
    setCallStatus("incoming");
    setTabValue(1);
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
      {callStatus === "incoming" && (
        <Incoming ref={videoRef} {...{ setCallStatus }} />
      )}
      {callStatus === "inCall" && (
        <InCall ref={videoRef} opponentId={opponentId} onEndCall={endCall} />
      )}
    </div>
  );
}
