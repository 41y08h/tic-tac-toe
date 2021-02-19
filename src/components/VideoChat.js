import React, { useEffect, useRef } from "react";
import Peer from "peerjs";

export default function VideoChat({ socketId, opponentId, isFirstPlayer }) {
  const videoRef = useRef();

  useEffect(() => {
    if (!opponentId || isFirstPlayer === null) return;
    const peer = new Peer(socketId);

    // First player calls second player
    if (isFirstPlayer) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const call = peer.call(opponentId, stream);
        call.on("stream", (opponentStream) => {
          const video = videoRef.current;
          video.srcObject = opponentStream;
        });
      });
    } else {
      // Second Player receives first player's call
      peer.on("call", function (call) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", function (opponentStream) {
            const video = videoRef.current;
            video.srcObject = opponentStream;
          });
        });
      });
    }
  }, [socketId, opponentId, isFirstPlayer]);
  return (
    <>
      <video
        autoPlay
        ref={videoRef}
        onLoadedMetadata={(e) => e.target.play()}
        style={{ width: "300px", height: "300px" }}
      />
    </>
  );
}
