import httpRequest from "src/utilities/services/httpRequest";

export function userInfo(friendId: number) {
  return httpRequest.get(`/post-service/api/v1/friend/friend-information?checkId=${friendId}`).then((data: any) => {
    return data;
  });
}

export function getSearchListFriend(search: string) {
  return httpRequest.get(`/post-service/api/v1/friend/list-search?search=${search}`).then((data: any) => {
    return data;
  });
}

export function getListFriend() {
  return httpRequest.get("/post-service/api/v1/friend/list").then((data: any) => {
    return data;
  });
}

export function getListRequest() {
  return httpRequest.get("/post-service/api/v1/friend/request/list").then((data: any) => {
    return data;
  });
}

export function onDeleteFriend(friendId: string) {
  return httpRequest.delete(`/post-service/api/v1/friend/delete?friendId=${friendId}`);
}

export function onSendRequesFriend(userId: string) {
  return httpRequest.post(`/post-service/api/v1/friend/add?id=${userId}`);
}

export function onAcceptRequestFriend(id: string) {
  return httpRequest.post(`/post-service/api/v1/friend/accept?id=${id}`, {});
}

export function onRejectRequestFriend(senderId: string) {
  return httpRequest.delete(`/post-service/api/v1/friend/reject?senderId=${senderId}`);
}

export function onDeleteRequestSend(receiverId: string) {
  return httpRequest.delete(`/post-service/api/v1/friend/delete-request/user?receiverId=${receiverId}`);
}

export function getListImage(userId: number) {
  return httpRequest.get(`/post-service/api/v1/post/group-images?userId=${userId}`).then((data: any) => {
    return data;
  });
}
