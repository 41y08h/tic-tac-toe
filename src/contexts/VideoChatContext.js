import React, { createContext, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import useEventSubscription from "../hooks/useEventSubscription";
import socket from "../RTCs/configureSocket";
import createPeer from "../RTCs/createPeer";
import events from "../RTCs/events";
import getMediaStream from "../utils/getMediaStream";
import { useChatTab } from "./ChatTabContext";

const VideoChatContext = createContext();

export function useVideoChat() {
  return useContext(VideoChatContext);
}

export default function VideoChatProvider({ children }) {
  const [callStatus, setCallStatus] = useState("IDLE");
  const [opponentId, setOpponentId] = useState(null);
  const [call, setCall] = useState(null);

  const { setTab } = useChatTab();
  const videoRef = useRef();
  const peerRef = useRef();

  function resetCallStates() {
    setCallStatus("IDLE");
    setCall(null);

    if (peerRef.current) peerRef.current.destroy();
    peerRef.current = null;
  }

  function onCallConnected(remoteStream) {
    setCallStatus("CONNECTED");
    videoRef.current.srcObject = remoteStream;
  }

  async function startOutgoingCall() {
    if (!opponentId) return;

    const stream = await getMediaStream();

    // Change call status to give user a nice action feedback
    setCallStatus("CALLING");

    // Connect to peer via sockets,
    // the socket will get notified
    // that his opponent is calling
    socket.emit(events.callPeer);

    peerRef.current = createPeer();

    const peer = peerRef.current;

    const call = peer.call(opponentId, stream);
    setCall(call);

    // When opponent answers the call
    call.on("stream", onCallConnected);
  }

  async function handleIncomingCall() {
    // Change call status and tab
    setCallStatus("INCOMING");
    setTab(1);

    peerRef.current = createPeer();

    const peer = peerRef.current;

    // Add listener for incoming call
    peer.on("call", (call) => {
      // Set call ref to handle mannual call answering by user in other component
      setCall(call);

      call.on("stream", onCallConnected);
    });
  }

  async function answerCall() {
    const stream = await getMediaStream();
    call.answer(stream);
  }

  async function endCall() {
    socket.emit(events.endCall);
    resetCallStates();
  }

  async function onEndCall() {
    resetCallStates();
  }

  async function rejectCall() {
    socket.emit(events.rejectCall);
    resetCallStates();
  }

  async function onRejectCall() {
    resetCallStates();
    toast("Your opponent rejected this call");
  }

  useEventSubscription(events.opponentId, setOpponentId);
  useEventSubscription(events.opponentIsCalling, handleIncomingCall);
  useEventSubscription(events.endCall, onEndCall);
  useEventSubscription(events.rejectCall, onRejectCall);

  const value = {
    videoRef,
    callStatus,
    setCallStatus,
    opponentId,
    setOpponentId,
    startOutgoingCall,
    endCall,
    onEndCall,
    answerCall,
    rejectCall,
  };
  return <VideoChatContext.Provider value={value} children={children} />;
}
