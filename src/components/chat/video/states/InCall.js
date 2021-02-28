import { makeStyles } from "@material-ui/core";
import React from "react";
import ActionButton from "../ActionButton";
import CallEndIcon from "@material-ui/icons/CallEnd";

const useStyles = makeStyles(() => ({
  video: { width: "100%", height: "100%" },
  actionsBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 80,
    padding: "0 20px",
  },
}));

const InCall = React.forwardRef(({ opponentId, onEndCall }, ref) => {
  const classes = useStyles();
  return (
    <>
      <video
        autoPlay
        ref={ref}
        onLoadedMetadata={(e) => e.target.play()}
        className={classes.video}
      />
      <div className={classes.actionsBox}>
        <ActionButton
          Icon={CallEndIcon}
          disabled={!opponentId}
          onClick={onEndCall}
          backgroundColor="red"
        />
      </div>
    </>
  );
});

export default InCall;
