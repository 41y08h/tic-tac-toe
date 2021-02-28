import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function VideoCallDialog({ open, setOpen, onAgree }) {
  return (
    <div>
      <Dialog
        style={{ textAlign: "left" }}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Start a video call</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will start a video call with your opponent
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onAgree();
            }}
            color="primary"
            autoFocus
          >
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
