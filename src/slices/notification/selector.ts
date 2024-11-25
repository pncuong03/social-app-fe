export const selectNotification = {
  getListNotification: (state: any) => state.notification.notifications,
};

export const selectNotificationCount = {
  getNotificationCount: (state: any) => state.notification.notiCount,
};
