import Peer from "simple-peer";

function createPeer({ initiator, stream }) {
  const peer = new Peer({ trickle: false, initiator, stream });

  return peer;
}
export default createPeer;
