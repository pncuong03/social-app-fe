import { useEffect } from "react";
import { useAppSelector } from "src/app/appHooks";
import Socket from "src/const/socket ";
import { selectAccessToken } from "src/slices/login/selector";

export const useSocket = ({
  messageCount,
  informCount,
  messages,
}: {
  messageCount: string;
  informCount: string;
  messages: any;
}) => {
  const token = useAppSelector(selectAccessToken.getToken);

  useEffect(() => {
    if (!token) return;

    const socketIo = new Socket();

    const socketInstance = socketIo.getInstance(token);

    // Thêm xử lý sự kiện khi nhận tin nhắn (tùy chỉnh theo nhu cầu của bạn)
    socketInstance.onmessage = (event: MessageEvent) => {
      console.log("Received message:", event.data);
      // Xử lý event data hoặc cập nhật vào state
    };

    // Cleanup khi component unmount hoặc token thay đổi
    return () => {
      if (socketIo) {
        socketIo.removeInstance();
      }
    };
  }, [token, messageCount, informCount, messages]);
};
