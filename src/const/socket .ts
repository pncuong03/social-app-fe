import { API_SOCKET } from "./env";
let socket: WebSocket | null = null;

export default class Socket {
  getInstance(token: string) {
    if (!socket) {
      socket = new WebSocket(`${API_SOCKET}?token=${token}`);

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
    return socket;
  }

  removeInstance() {
    if (socket) {
      socket.close();
      socket = null;
    }
  }
}
