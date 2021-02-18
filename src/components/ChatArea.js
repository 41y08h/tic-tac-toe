import React from "react";
import ChatForm from "./ChatForm";
import Notify from "./Notify";
import Messages from "./Messages";
import Paper from "@material-ui/core/Paper";
import "../ChatArea.css";

export default function CharArea({ socket, notification, messages, socketId }) {
  return (
    <>
      <Paper className="chat-area" variant="outlined">
        <Notify notification={notification} />
        <Messages socketId={socketId} messages={messages} />
        <ChatForm socket={socket} />
      </Paper>
    </>
  );
}
