import React from "react";
import Message from "./Message";

export default function Messages({ messages }) {
  return (
    <div className="messages">
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </div>
  );
}
