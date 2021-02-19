import React from "react";
import { Paper } from "@material-ui/core";
import { useGame } from "../contexts/GameContext";

export default function NotificationBar(props) {
  const { notification } = useGame();
  return (
    <Paper elevation={0} square {...props}>
      {notification}
    </Paper>
  );
}
