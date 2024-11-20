import httpRequest from "src/utilities/services/httpRequest";

export function getUser(search: string) {
  return httpRequest.get(`/user/list?search=${search}`).then((data: any) => {
    return data;
  });
}
