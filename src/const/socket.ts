let socketIo: WebSocket | null = null;

export default class Socket {
  getInstance = (token: string): WebSocket | null => {
    if (!socketIo) {
      socketIo = new WebSocket("ws://localhost:8087/chat");

      // Authenticate when the connection opens
      socketIo.onopen = () => {
        const authMessage = JSON.stringify({
          accessToken: `Bearer ${token}`,
        });

        socketIo!.send(authMessage);

        console.log("WebSocket connected and authentication message sent.");
      };
    }

    return socketIo;
  };
}
