import httpRequest from "src/utilities/services/httpRequest";

export function getPostPublic(accessToken: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get("/post/list/friends", auth).then((data: any) => {
    return data;
  });
}

export function getPostofMe(accessToken: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get("/post/list/me", auth).then((data: any) => {
    return data;
  });
}

export function getDetailPost(accessToken: string, postId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.get(`/user/post/interaction?postId=${postId}`, auth).then((data: any) => {
    return data;
  });
}

export function createPost(postData: FormData, accessToken: string) {
  const auth = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.post("/post/post", postData, auth);
}

export function onLike(accessToken: string, postId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.post(`/user/post/interaction/like?postId=${postId}`, {}, auth);
}

export function onUnLike(accessToken: string, postId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.delete(`/user/post/interaction/remove-like?postId=${postId}`, auth);
}

export function onShare(
  accessToken: string,
  { content, state, postId }: { content: string; state: string; postId: string }
) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.post(`/post/share?shareId=${postId}`, { content, state }, auth);
}

export function onComment(accessToken: string, postId: string, comment: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.post(`/user/post/interaction/comment?postId=${postId}&comment=${comment}`, {}, auth);
}

export function onDeleteComment(accessToken: string, commentId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.delete(`/user/post/interaction/comment/delete?commentId=${commentId}`, auth);
}

export function onDeletePost(accessToken: string, postId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest.delete(`/post/delete?postId=${postId}`, auth);
}
