import io from "socket.io-client";

const backendURL =
  process.env.NODE_ENV === "development"
    ? "https://7e2f556d0c99.ngrok.io"
    : process.env.REACT_APP_BACKEND;

const socket = io(backendURL);

export default socket;
