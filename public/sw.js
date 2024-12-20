self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

let isPageVisible = false; // Theo dõi trạng thái hiển thị của trang

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VISIBILITY_CHANGE") {
    isPageVisible = event.data.visibilityState === "visible";
  }
});

self.addEventListener("push", (event) => {
  if (event.data) {
    try {
      const data = event.data.json();
      console.log("Push received:", data);

      const { type, fullName, imageUrl } = data;

      let title = "Thông báo";
      let body = "Bạn có một thông báo mới.";
      let icon = imageUrl || "/default-icon.png";
      let url = "/";

      switch (type) {
        case "ACCEPT_FRIEND_REQUEST":
          body = `${fullName} đã chấp nhận kết bạn.`;
          url = "/friends/request";
          break;
        case "FRIEND_REQUEST":
          body = `${fullName} đã gửi lời mời kết bạn.`;
          url = "/friends/list";
          break;
        case "MESSAGE":
          body = `${fullName} đã gửi bạn một tin nhắn.`;
          url = `/messages/${data.chatId || ""}`;
          break;
        case "LIKE":
          body = `${fullName} đã thích bài viết của bạn.`;
          url = `/`;
          break;
        case "COMMENT":
          body = `${fullName} đã bình luận bài viết của bạn.`;
          url = `/`;
          break;
        case "SHARE":
          body = `${fullName} đã chia sẻ bài viết của bạn.`;
          url = `/`;
          break;
        default:
          body = "Bạn có một thông báo mới.";
          url = "/";
          break;
      }

      const options = {
        body,
        icon,
        badge: icon,
        actions: [
          {
            action: "open_url",
            title: "Xem chi tiết",
          },
        ],
        vibrate: [200, 100, 200],
        data: { url },
      };

      if (!isPageVisible) {
        // Chỉ hiển thị thông báo nếu trang không hiển thị
        event.waitUntil(self.registration.showNotification(title, options));
      }
    } catch (error) {
      console.error("Error handling push event:", error);
    }
  } else {
    console.warn("Push event triggered but no data received.");
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const { url } = event.notification.data || {};

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const matchingClient = clientList.find((client) => client.url === url && "focus" in client);

      if (matchingClient) {
        // Focus vào tab nếu đã mở
        return matchingClient.focus();
      }

      if (clients.openWindow && url) {
        // Mở tab mới nếu không có tab nào
        return clients.openWindow(url);
      }
    })
  );
});
