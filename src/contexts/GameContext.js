import React, { createContext, useContext, useState, useMemo } from "react";
import io from "socket.io-client";

const GameContext = createContext();

// Short configurations
const environment = process.env.NODE_ENV;
const backendURLs = {
  development: "http://localhost:5000/",
  production: process.env.REACT_APP_BACKEND,
};
const backendURL = backendURLs[environment];
const socket = io(backendURL);

export function useGame() {
  return useContext(GameContext);
}

export default function GameProvider({ children }) {
  const [notification, setNotification] = useState("Connecting ...");
  const [messages, setMessages] = useState([]);
  const [opponentId, setOpponentId] = useState("");
  const [isFirstPlayer, setIsFirstPlayer] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(""));

  const value = {
    board,
    setBoard,
    notification,
    setNotification,
    messages,
    setMessages,
    opponentId,
    setOpponentId,
    isFirstPlayer,
    setIsFirstPlayer,
    socket,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
