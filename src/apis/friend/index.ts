import httpRequest from "src/utilities/services/httpRequest";

export function friendInfo(accessToken: string, friendId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get(`/friend/friend-information?checkId=${friendId}`, auth).then((data: any) => {
    return data;
  });
}

export function getListFriend(accessToken: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get("/friend/list", auth).then((data: any) => {
    return data;
  });
}

export function getListRequest(accessToken: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get("/friend/request/list", auth).then((data: any) => {
    return data;
  });
}

export function onDeleteFriend(accessToken: string, friendId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.delete(`/friend/delete?friendId=${friendId}`, auth);
}

export function onAcceptRequestFriend(accessToken: string, id: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.post(`/friend/accept?id=${id}`, {}, auth);
}

export function onRejectRequestFriend(accessToken: string, senderId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.delete(`/friend/reject?senderId=${senderId}`, auth);
}

export function onDeleteRequestSend(accessToken: string, receiverId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.delete(`/friend/delete-request/user?receiverId=${receiverId}`, auth);
}
