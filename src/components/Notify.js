import React from "react";
import Paper from "@material-ui/core/Paper";

export default function Notify({ notification }) {
  return (
    <Paper className="notification" variant="outlined">
      {notification}
    </Paper>
  );
}
