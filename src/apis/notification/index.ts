import httpRequest from "src/utilities/services/httpRequest";

export function getListNotification(page: number) {
  return httpRequest.get(`/post-service/api/v1/notification?page=${page}&size=20`).then((data: any) => {
    return data;
  });
}
