import React, { createContext, useContext, useState } from "react";

const ChatTabContext = createContext();

export function useChatTab() {
  return useContext(ChatTabContext);
}

export default function ChatTabProvider({ children }) {
  const [tab, setTab] = useState(0);
  const value = { tab, setTab };

  return <ChatTabContext.Provider value={value} children={children} />;
}
