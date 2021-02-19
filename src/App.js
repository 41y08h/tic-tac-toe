import React, { useState, useEffect } from "react";
import events from "./events";
import Board from "./components/Board";
import Heading from "./components/Heading";
import "./App.css";
import InfoContainer from "./components/InfoContainer";
import { makeStyles } from "@material-ui/core";
import { useGame } from "./contexts/GameContext";

export default function App() {
  const {
    setBoard,
    setNotification,
    setMessages,
    setOpponentId,
    setIsFirstPlayer,

    socket,
  } = useGame();

  useEffect(() => {
    socket.on(events.notification, setNotification);
    socket.on(events.play, setBoard);

    socket.on(events.message, (...messages) =>
      setMessages((previousMessages) => [...previousMessages, ...messages])
    );
    socket.on(events.opponentId, (payload) => {
      setOpponentId(payload.id);
      setIsFirstPlayer(payload.isFirstPlayer);
    });
  }, [
    setBoard,
    setIsFirstPlayer,
    setMessages,
    setNotification,
    setOpponentId,
    socket,
  ]);

  const useStyles = makeStyles(() => ({
    root: { maxWidth: "302px", margin: "auto" },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Heading />
      <Board />
      <InfoContainer />
    </div>
  );
}
