import axios from "axios";
import httpRequest from "src/utilities/services/httpRequest";

export function getPostofFriend(page: number) {
  return httpRequest
    .get(`/post-service/api/v1/post/list/friends?page=${page}&size=5&sort=createdAt,desc`)
    .then((data: any) => {
      return data;
    });
}

export function getPostofUser(userId: number, page: number) {
  return httpRequest
    .get(`/post-service/api/v1/post/list/post-user?userId=${userId}&page=${page}&size=5&sort=createdAt,desc`)
    .then((data: any) => {
      return data;
    });
}

export function getPostofMe(page: number) {
  return httpRequest
    .get(`/post-service/api/v1/post/list/me?page=${page}&size=5&sort=createdAt,desc`)
    .then((data: any) => {
      return data;
    });
}

export function getDetailPost(postId: number) {
  return httpRequest.get(`/post-service/api/v1/user/post/interaction?postId=${postId}`).then((data: any) => {
    return data;
  });
}

export function onCreatePost(params: { content: string; state: string; imageUrls: string[] }) {
  return httpRequest.post("/post-service/api/v1/post/post", params);
}

export function onLike(postId: number) {
  return httpRequest.post(`/post-service/api/v1/user/post/interaction/like?postId=${postId}`, {});
}

export function onUnLike(postId: number) {
  return httpRequest.delete(`/post-service/api/v1/user/post/interaction/remove-like?postId=${postId}`);
}

export function onShare(postId: number, params: { content: string; state: string }) {
  return httpRequest.post(`/post-service/api/v1/post/share?shareId=${postId}`, params);
}

export function onComment(postId: number, comment: string) {
  return httpRequest.post(`/post-service/api/v1/user/post/interaction/comment?postId=${postId}&comment=${comment}`, {});
}

export function onDeleteComment(commentId: number) {
  return httpRequest.delete(`/post-service/api/v1/user/post/interaction/comment/delete?commentId=${commentId}`);
}

export function onEditPost(postId: number, params: { content: string; state: string; imageUrls: string[] }) {
  return httpRequest.put(`/post-service/api/v1/post/update?postId=${postId}`, params);
}

export function onDeletePost(postId: number) {
  return httpRequest.delete(`/post-service/api/v1/post/delete?postId=${postId}`);
}

export function onCreateImage(data: FormData) {
  return axios
    .post(`http://localhost:8088/api/v1/upload/upload-image`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data: any) => {
      return data;
    });
}
