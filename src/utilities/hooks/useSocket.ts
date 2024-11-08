import { useEffect } from "react";
import LocalStorage, { LocalStorageKey } from "../local-storage/localStorage";

export const useSocket = () => {
  const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN) || "";
  const socket = new WebSocket("ws://localhost:8087/chat");

  useEffect(() => {
    socket.onopen = () => {
      const authMessage = JSON.stringify({
        accessToken: `Bearer ${accessToken}`,
      });

      socket.send(authMessage);
    };

    return () => {
      if (socket) socket.close();
    };
  }, [accessToken]);

  return { socket };
};
