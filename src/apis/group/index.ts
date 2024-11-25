import httpRequest from "src/utilities/services/httpRequest";

export function getListGroup(page: number) {
  return httpRequest.get(`/post-service/api/v1/group/get-list-group?page=${page}&size=12`).then((data: any) => {
    return data;
  });
}

export function getInfoGroup(groupId: number) {
  return httpRequest.get(`/post-service/api/v1/group/group/infor?groupId=${groupId}`).then((data: any) => {
    return data;
  });
}

export function getMemberGroup(groupId: number, page: number) {
  return httpRequest
    .get(`/post-service/api/v1/group/members?groupId=${groupId}&page=${page}&size=10`)
    .then((data: any) => {
      return data;
    });
}

export function onSearchGroup(search: string) {
  return httpRequest.get(`/post-service/api/v1/group/search?search=${search}`).then((data: any) => {
    return data;
  });
}

export function onCreateGroup(params: { name: string; userIds: number[]; tagIds: number[] }) {
  return httpRequest.post("/post-service/api/v1/group/create-group", params);
}

export function onAddMemberGroup(params: { groupId: number; userIds: number[] }) {
  return httpRequest.post(`/post-service/api/v1/group/add-member`, params);
}

export function onLeaveGroup(groupId: number) {
  return httpRequest.delete(`/post-service/api/v1/group/leave-group?groupId=${groupId}`);
}

export function onDeleteMember(params: { groupId: number; userIds: number }) {
  return httpRequest.delete(`/post-service/api/v1/group/delete-member`, params);
}

export function getPostGroup(groupId: number, page: number) {
  return httpRequest
    .get(`/post-service/api/v1/post-group/get-post?groupId=${groupId}&page=${page}&size=10`)
    .then((data: any) => {
      return data;
    });
}

export function onCreatePostGroup(params: { content: string; imageUrls: string[]; groupId: number }) {
  return httpRequest.post("/post-service/api/v1/post-group/post", params);
}

export function onEditPostGroup(params: { content: string; imageUrls: string[]; groupId: number }, postId: number) {
  return httpRequest.put(`/post-service/api/v1/post-group/update?postId=${postId}`, params);
}

export function onDeletePostGroup(groupId: number, postId: number) {
  return httpRequest.delete(`/post-service/api/v1/post-group/delete?postId=${postId}&groupId=${groupId}`);
}
