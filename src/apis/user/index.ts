import httpRequest from "src/utilities/services/httpRequest";

export function getUser(search: string) {
  return httpRequest.get(`/post-service/api/v1/friend/all-user/list?search=${search}`).then((data: any) => {
    return data;
  });
}

export function onEditInfo(params: {
  fullName: string;
  birthdayString: string;
  gender: string;
  work: string;
  description: string;
  live: string;
  imageUrl: string;
}) {
  return httpRequest.post(`/uaa-service/api/v1/user/change-user-information`, params);
}
