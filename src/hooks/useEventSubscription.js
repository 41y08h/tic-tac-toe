import { useEffect } from "react";
import socket from "../RTCs/configureSocket";

export default function useEventSubscription(event, listener) {
  useEffect(() => {
    socket.on(event, listener);
    return () => socket.off(event);
  }, [event, listener]);
}
