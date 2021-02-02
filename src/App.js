import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import events from "./events";
import Board from "./components/Board";
import Heading from "./components/Heading";
import ChatArea from "./components/ChatArea";
import "./App.css";

// Short configurations
const environment = process.env.NODE_ENV;
const backendURLs = {
  development: "http://localhost:5000/",
  production: process.env.REACT_APP_BACKEND,
};
const backendURL = backendURLs[environment];

const socket = io(backendURL);

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [notification, setNotification] = useState("Connecting ...");
  const [messages, setMessages] = useState([]);

  // Game Functions;
  function onPlay(e) {
    // Emit event to server
    socket.emit(events.play, e.target.id);
  }

  useEffect(() => {
    socket.on(events.notification, setNotification);
    socket.on(events.messages, setMessages);
    socket.on(events.play, setBoard);

    socket.on(events.message, (newMessage) =>
      setMessages((previousMessages) => [...previousMessages, newMessage])
    );


  }, []);

  return (
    <>
      <Heading />
      <Board values={board} onPlay={onPlay} />
      <ChatArea
        socket={socket}
        notification={notification}
        messages={messages}
        playerId={socket.id}
      />
    </>
  );
}
