import React, { useState } from "react";
import CallIcon from "@material-ui/icons/Call";
import { IconButton, makeStyles } from "@material-ui/core";
import { useVideoChat } from "../../../contexts/VideoChatContext";
import VideoCallDialog from "./VideoCallDialog";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  icon: { color: "white" },
  button: { padding: 20, backgroundColor: "green !important" },
}));

export default function Idle() {
  const classes = useStyles();
  const { startOutgoingCall, opponentId } = useVideoChat();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function onCallButtonClicked() {
    if (!opponentId) return toast("Your opponent must be connected");
    setIsDialogOpen(true);
  }

  return (
    <>
      <IconButton className={classes.button} onClick={onCallButtonClicked}>
        <CallIcon fontSize="large" className={classes.icon} />
      </IconButton>
      <VideoCallDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onAgree={startOutgoingCall}
      />
    </>
  );
}
