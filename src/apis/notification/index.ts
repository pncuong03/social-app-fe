import httpRequest from "src/utilities/services/httpRequest";

export function getListNotification(page: number) {
  return httpRequest
    .get(`/post-service/api/v1/notification?page=${page}&size=10&sort=createdAt,desc`)
    .then((data: any) => {
      return data;
    });
}

export function getEventNoti() {
  return httpRequest.get("/rtc-service/api/v1/event-notification").then((data: any) => {
    return data;
  });
}
