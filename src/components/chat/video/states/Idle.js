import React, { useState } from "react";
import ActionButton from "../ActionButton";
import CallIcon from "@material-ui/icons/Call";
import VideoCallDialog from "../VideoCallDialog";
import { makeStyles } from "@material-ui/core";
import startCall from "../utils/startCall";

const useStyles = makeStyles(() => ({
  callButton: { padding: 20, border: "8px solid #eee" },
}));

const Idle = React.forwardRef(({ opponentId, setCallStatus }, videoRef) => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onCallConnected(remoteStream) {
    setCallStatus("inCall");

    // Set stream in video element
    const videoElement = videoRef.current;
    videoElement.srcObject = remoteStream;
  }

  async function onStartCallClicked() {
    const opponentIsConnected = Boolean(opponentId);
    if (!opponentIsConnected) return;

    setCallStatus("calling");
    try {
      startCall(opponentId, onCallConnected);
    } catch (error) {
      setCallStatus("idle");
      alert(error.message);
    }
  }

  return (
    <>
      <ActionButton
        Icon={CallIcon}
        fontSize="large"
        backgroundColor="green"
        disabled={!opponentId}
        className={classes.callButton}
        onClick={() => setIsDialogOpen(true)}
      />
      <VideoCallDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onAgree={onStartCallClicked}
      />
    </>
  );
});

export default Idle;
