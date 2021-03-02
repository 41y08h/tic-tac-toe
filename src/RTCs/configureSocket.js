import io from "socket.io-client";

const backendURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REACT_APP_BACKEND;

const socket = io(backendURL);

export default socket;
