import httpRequest from "src/utilities/services/httpRequest";

export function getUser(accessToken: string, search: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get(`/user/list?search=${search}`, auth).then((data: any) => {
    return data;
  });
}
