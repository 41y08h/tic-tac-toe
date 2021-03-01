import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";

export default function ActionButton({
  isLarge = false,
  color,
  icon: Icon,
  ...otherProps
}) {
  const useStyles = makeStyles(() => ({
    icon: { color: "white" },
    button: { backgroundColor: ` ${color} !important` },
  }));
  const classes = useStyles();

  return (
    <IconButton className={classes.button} {...otherProps}>
      <Icon fontSize={isLarge ? "large" : "small"} className={classes.icon} />
    </IconButton>
  );
}
