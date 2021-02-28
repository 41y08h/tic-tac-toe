import React, { useRef, useEffect, useState } from "react";
import Messages from "./Messages";
import ChatForm from "./ChatForm";
import { makeStyles, Tab, Tabs } from "@material-ui/core";
import { useGame } from "../contexts/GameContext";
import socket from "../RTCs/configureSocket";
import events from "../RTCs/events";
import Peer from "peerjs";
import VideoCallDialog from "./VideoCallDialog";
import VideocamIcon from "@material-ui/icons/Videocam";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import TextChat from "./TextChat";
import SwipeableViews from "react-swipeable-views";

import NotificationBar from "./NotificationBar";
import VideoChat from "./VideoChat";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 1,
  },
  top: {
    backgroundColor: "#ff5e78",
    color: "white",
  },
  bottom: {
    border: "1px solid #dbdbdb",
    borderTop: "1px solid #eee",
    marginBottom: 36,
    backgroundColor: "white",
    maxHeight: 220,
  },
}));

export default function InfoContainer() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [isInCall, setIsInCall] = useState(false);
  const videoRef = useRef();
  const { opponentId } = useGame();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialogCancel() {
    setTabValue(0);
    setIsDialogOpen(false);
  }
  function handleDialogOK() {
    setIsDialogOpen(false);
    startVideoCall();
  }
  function onStartVideoCall() {
    setIsDialogOpen(true);
  }

  function onTabChange(arg1, arg2) {
    const value = typeof arg1 !== "number" ? arg2 : arg1;
    setTabValue(value);
  }

  useEffect(() => {
    tabValue === 1 && !isInCall && onStartVideoCall();
  }, [tabValue, isInCall]);

  function startVideoCall() {
    setIsInCall(true);
    socket.emit(events.callPeer);
    const peer = new Peer(socket.id, {
      host: "localhost",
      port: 3001,
      path: "/",
      debug: 3,
    });

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const call = peer.call(opponentId, stream);
      call.on("stream", (remoteStream) => {
        const video = videoRef.current;
        video.srcObject = remoteStream;
        console.log("outbound call connected!");
      });
    });
  }

  useEffect(() => {
    socket.on(events.beReceiver, () => {
      const peer = new Peer(socket.id, {
        host: "localhost",
        port: 3001,
        path: "/",
        debug: 3,
      });
      peer.on("call", (call) => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          call.answer(stream);
          setIsInCall(true);
          call.on("stream", (remoteStream) => {
            const video = videoRef.current;
            video.srcObject = remoteStream;
            console.log("inbound call connected!");
          });
        });
      });
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <NotificationBar className={classes.notification} />
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          variant="fullWidth"
          aria-label="chat tabs"
          color="inherit"
        >
          <Tab icon={<ChatBubbleIcon />} />
          <Tab icon={<VideocamIcon />} />
        </Tabs>
      </div>
      <div className={classes.bottom}>
        <SwipeableViews axis="x" index={tabValue} onChangeIndex={onTabChange}>
          <TextChat />
          <VideoChat ref={videoRef} />
        </SwipeableViews>
      </div>
      <VideoCallDialog
        open={isDialogOpen}
        onCancel={handleDialogCancel}
        onOK={handleDialogOK}
      />
    </div>
  );
}
