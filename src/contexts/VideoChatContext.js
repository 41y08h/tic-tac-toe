import events from "../RTCs/events";
import { toast } from "react-hot-toast";
import createPeer from "../RTCs/createPeer";
import socket from "../RTCs/configureSocket";
import { useChatTab } from "./ChatTabContext";
import getMediaStream from "../utils/getMediaStream";
import useEventSubscription from "../hooks/useEventSubscription";
import React, { createContext, useContext, useRef, useState } from "react";

const VideoChatContext = createContext();

export function useVideoChat() {
  return useContext(VideoChatContext);
}

export default function VideoChatProvider({ children }) {
  const [callStatus, setCallStatus] = useState("IDLE");
  const [isOpponentConnected, setIsOpponentConnected] = useState(false);
  const [callerSignal, setCallerSignal] = useState();

  const { setTab } = useChatTab();
  const videoRef = useRef();
  const callerRef = useRef();
  const receiverRef = useRef();

  // ***** Initiating and receiving call*****
  async function startOutgoingCall() {
    // Get media stream from user's camera
    const stream = await getMediaStream();

    // Change calling status to show calling feedback in UI
    setCallStatus("CALLING");

    // Create a caller WebRTC connection and set it globally,
    // so that we can access this caller connection later

    // `initiator` is meant to say that,
    // this user is initiating connection in WebRTC world
    callerRef.current = createPeer({ initiator: true, stream });

    // Just a reference to callerRef for convenience
    const caller = callerRef.current;

    // Passing connection signal to the receiver by websockets
    caller.on("signal", (signal) => {
      socket.emit(events.callPeer, signal);
    });

    // Once the handshake is complete,
    // and we have a stream, show it in the UI
    caller.on("stream", onCallConnected);
  }

  async function onIncomingCall(callerSignal) {
    // Change UI components to let the user decide
    // what to do with the incoming call
    setCallStatus("INCOMING");
    setTab(1);

    // Set caller signal globally to handle it when
    // the user answers the call
    setCallerSignal(callerSignal);
  }

  // ***** Answering and connecting streams *****
  async function answerCall() {
    const stream = await getMediaStream();

    // Create a receiver (globally, to use it later on)
    // WebRTC connection and pass it caller's signal
    receiverRef.current = createPeer({ initiator: false, stream });
    const receiver = receiverRef.current;
    receiver.signal(callerSignal);

    // At this point, the caller is done passing it's
    // signal to receiver, but to complete the handshake
    // we need to pass receiver's signal to caller

    // Passing connection signal to the caller by websockets
    // and as soon as it is complete, the connection is established
    receiver.on("signal", (signal) => {
      socket.emit(events.answerCall, signal);
    });

    // When the connection is established and we get
    // a stream from the other user, show it in UI
    receiver.on("stream", onCallConnected);
  }

  async function onCallAnswered(receiverSignal) {
    // When the receiver answers the call,
    // complete the signaling process by passing the
    // receiver's signal to the caller connection
    const caller = callerRef.current;
    caller.signal(receiverSignal);
  }

  function onCallConnected(remoteStream) {
    setCallStatus("CONNECTED");
    videoRef.current.srcObject = remoteStream;
  }

  // ***** Rejecting incoming calls and ending outgoing or connected calls *****
  function endCall() {
    socket.emit(events.endCall);
    resetCallStates();
  }

  function onCallEnded() {
    resetCallStates();
    toast("The call has been ended");
  }

  function rejectCall() {
    socket.emit(events.rejectCall);
    resetCallStates();
  }

  function onCallRejected() {
    resetCallStates();
    toast("Your opponent rejected this call");
  }

  function resetCallStates() {
    if (callerRef.current) callerRef.current.destroy();
    if (receiverRef.current) receiverRef.current.destroy();
    setCallStatus("IDLE");
  }

  function onOpponentJoinStateChanged(isConnected) {
    resetCallStates();
    setIsOpponentConnected(isConnected);
  }

  useEventSubscription(events.opponentIsCalling, onIncomingCall);
  useEventSubscription(events.callAnswered, onCallAnswered);
  useEventSubscription(events.isOpponentConnected, onOpponentJoinStateChanged);
  useEventSubscription(events.callEnded, onCallEnded);
  useEventSubscription(events.callRejected, onCallRejected);

  const value = {
    videoRef,
    callStatus,
    setCallStatus,
    startOutgoingCall,
    isOpponentConnected,
    answerCall,
    endCall,
    rejectCall,
  };
  return <VideoChatContext.Provider value={value} children={children} />;
}
