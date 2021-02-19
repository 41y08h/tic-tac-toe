import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import VideocamIcon from "@material-ui/icons/Videocam";
import NotificationBar from "./NotificationBar";

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 1 },
  bar: {
    backgroundColor: "#ff5e78",
    boxShadow: "none",
  },
  actions: { marginLeft: "auto" },
  notification: {
    margin: "16px 24px 2px",
    backgroundColor: "#f17d90",
    color: "white",
    padding: "8px 2px",
  },
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <NotificationBar className={classes.notification} />
        <Toolbar>
          <Typography variant="h6" noWrap>
            Chat
          </Typography>
          <div className={classes.actions}>
            <IconButton aria-label="video call" color="inherit">
              <VideocamIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
