import createPeer from "../../../../RTCs/createPeer";
import socket from "../../../../RTCs/configureSocket";
import events from "../../../../RTCs/events";

export default async function startCall(opponentId, onConnected) {
  const getUserMedia = navigator.mediaDevices.getUserMedia;
  const hasCameraSupport = Boolean(getUserMedia);
  if (!hasCameraSupport) throw new Error("Bad Camera Support");

  const peer = createPeer();

  const options = { video: true, audio: true, facingMode: "user" };
  const stream = await navigator.mediaDevices.getUserMedia(options);

  socket.emit(events.callPeer);
  const call = peer.call(opponentId, stream);
  call.on("stream", onConnected);
}
