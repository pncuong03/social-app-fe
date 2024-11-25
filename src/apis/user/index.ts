import httpRequest from "src/utilities/services/httpRequest";

export function getUser(search: string) {
  return httpRequest.get(`/post-service/api/v1/friend/all-user/list?search=${search}`).then((data: any) => {
    return data;
  });
}
