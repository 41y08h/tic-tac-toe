import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FaceIcon from "@material-ui/icons/Face";
import PersonIcon from "@material-ui/icons/Person";

export default function Message({ message, playerId }) {
  return (
    <ListItem>
      {message.playerId === playerId ? (
        <FaceIcon color="action" />
      ) : (
        <PersonIcon color="action" />
      )}
      <ListItemText className="message-text" primary={message.text} />
    </ListItem>
  );
}
