import { useEffect, useRef, useState } from "react";
import LocalStorage, { LocalStorageKey } from "../local-storage/localStorage";
import { IMessage } from "src/types/message";
import { API_SOCKET } from "src/const/env";

export const useSocket = () => {
  const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN) || "";
  const [isPaused, setPause] = useState(false);
  const [reconnect, setReconnect] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const openMessage = useRef<string | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<IMessage>();

  console.log("receivedMessages", receivedMessages);

  useEffect(() => {
    ws.current = new WebSocket(API_SOCKET);

    ws.current.onopen = () => {
      const authMessage = JSON.stringify({
        accessToken: `Bearer ${accessToken}`,
      });

      ws.current?.send(authMessage);

      console.log("WebSocket opened");
    };

    ws.current.onmessage = (event) => {
      try {
        const rawMessage = event.data;

        const jsonMatch = rawMessage.match(/{.*}/);

        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          const messageObject = JSON.parse(jsonString);

          setReceivedMessages(messageObject);
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    // ws.current.onclose = (event) => {
    //   console.warn("WebSocket disconnected:", event);

    //   // Tùy chọn: Thử kết nối lại
    //   if (!isPaused) {
    //     console.log("Reconnecting WebSocket...");
    //     setReconnect((prev) => !prev);
    //   }
    // };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent?.close();
    };
  }, [accessToken, reconnect]);

  const sendMessage = (messageSender: any) => {
    const message = JSON.stringify(messageSender);

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.log("WebSocket not open, attempting to reconnect...");
      openMessage.current = message;
      setReconnect((prev) => !prev);
    }
  };

  return { sendMessage, setPause, isPaused, receivedMessages };
};
