import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";

export default function HintTextItem() {
  const useStyles = makeStyles(() => ({
    text: { fontSize: ".8rem" },
    wrapper: { textAlign: "center" },
  }));
  const classes = useStyles();

  return (
    <ListItem button>
      <ListItemText className={classes.wrapper}>
        <span className={classes.text}>
          Share this website with your friend to play
        </span>
      </ListItemText>
    </ListItem>
  );
}
