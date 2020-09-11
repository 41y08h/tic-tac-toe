import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ChatArea from "./components/ChatArea";
import io from "socket.io-client";
const socket = io(process.env.REACT_APP_BACKEND);

export default function App() {
  // Game States;
  const [board, setboard] = useState(Array(9).fill(null));
  const [messages, setmessages] = useState([]);

  // UI states;
  const [notification, setnotification] = useState(null);

  // Game Functions;
  function onPlay(e) {
    const index = e.target.id;

    // Send to server
    socket.emit("play", index);
  }

  useEffect(() => {
    socket.on("notification", setnotification);
    socket.on("play", setboard);
    socket.on("winner", (winner) => {
      if (winner === "DRAW") {
        setnotification("Tie game!");
      } else {
        setnotification(winner);
      }
    });

    socket.on("message", (message) => {
      setmessages((prev) => {
        const newMessages = prev.slice();
        newMessages.push(message);
        return newMessages;
      });
    });
  }, []);

  return (
    <>
      <h1 className="game-heading">
        <i className="fab fa-twitch"></i>&nbsp; Tic Tac Toe
      </h1>
      <Board values={board} onPlay={onPlay} />
      <ChatArea
        socket={socket}
        notification={notification}
        messages={messages}
      />
    </>
  );
}
