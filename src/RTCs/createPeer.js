import Peer from "peerjs";
import socket from "./configureSocket";

function createPeer() {
  const devOptions = { host: "localhost", port: 5001, path: "/", debug: 2 };
  const options = process.env.NODE_ENV === "development" ? devOptions : {};
  const peer = new Peer(socket.id, options);

  return peer;
}
export default createPeer;
