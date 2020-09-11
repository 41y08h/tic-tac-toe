import React from "react";

export default function Message({ message }) {
  return (
    <>
      {message.isOfPlayer ? (
        <div className="message">You: {message.message}</div>
      ) : (
        <div className="message message-opponent">
          Opponent: {message.message}
        </div>
      )}
    </>
  );
}
