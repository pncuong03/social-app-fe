import httpRequest from "src/utilities/services/httpRequest";

export function getListMessage(page: number) {
  return httpRequest.get(`/rtc-service/api/v1/chat?page=${page}&size=12`).then((data: any) => {
    return data;
  });
}

export function getMessageDetail(chatId: string, page: number) {
  return httpRequest
    .get(`/rtc-service/api/v1/chat/messages?chatId=${chatId}&page=${page}&size=20`)
    .then((data: any) => {
      return data;
    });
}

export function getListMemberChat(groupId: string) {
  return httpRequest.get(`/rtc-service/api/v1/group-chat?groupId=${groupId}`).then((data: any) => {
    return data;
  });
}

export function onDeleteMemeberChat(groupChatId: string, userId: string) {
  return httpRequest.delete(`/rtc-service/api/v1/group-chat/delete-member?groupChatId=${groupChatId}&userId=${userId}`);
}

export function onLeaveChat(chatId: string) {
  return httpRequest.delete(`/rtc-service/api/v1/group-chat/leave-group?chatId=${chatId}`);
}

export function onSearchChat(search: string) {
  return httpRequest.get(`/rtc-service/api/v1/group-chat/search?search=${search}`).then((data: any) => {
    return data;
  });
}

export function onCreateGroupChat(params: { name: string; userIds: string[] }) {
  return httpRequest.post(`/rtc-service/api/v1/group-chat`, params);
}

export function onAddMemberChat(params: { groupChatId: string; userIds: string[] }) {
  return httpRequest.post(`/rtc-service/api/v1/group-chat/add-new`, params);
}
