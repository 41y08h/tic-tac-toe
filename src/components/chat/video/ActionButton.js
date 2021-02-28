import React from "react";
import { IconButton } from "@material-ui/core";

export default function ActionButton({
  Icon,
  backgroundColor,
  fontSize = "small",
  ...props
}) {
  return (
    <IconButton {...props} style={{ backgroundColor }}>
      <Icon {...{ fontSize }} style={{ color: "white" }} />
    </IconButton>
  );
}
