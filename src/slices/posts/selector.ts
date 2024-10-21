export const selectPost = {
  getPostsPublic: (state: any) => state.post.postOfPublic,
  getPostsMe: (state: any) => state.post.postOfMe,
  getPostsFriend: (state: any) => state.post.postOfFriend,
  getPostDetail: (state: any) => state.post.detailPost,
};
