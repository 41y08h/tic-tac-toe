import React, { useEffect } from "react";
import createPeer from "../../../../RTCs/createPeer";

const media = {};

const Incoming = React.forwardRef(({ setCallStatus }, videoRef) => {
  useEffect(() => {
    const getUserMedia =
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    const hasCameraSupport = Boolean(getUserMedia);
    if (!hasCameraSupport) throw new Error("Bad Camera Support");

    const peer = createPeer();

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true, facingMode: "user" })
        .then((stream) => {
          call.close();
          return;
          media.stream = stream;
          media.call = call;
          call.on("stream", (remoteStream) => {
            setCallStatus("inCall");
            const video = videoRef.current;
            video.srcObject = remoteStream;
          });
        });
    });
  });

  return (
    <>
      <p>Your opponent is calling you...</p>
      <button
        onClick={() => {
          media.call.answer(media.stream);
        }}
      >
        answer
      </button>
    </>
  );
});

export default Incoming;
