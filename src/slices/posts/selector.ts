export const selectPost = {
  getPostsFriends: (state: any) => state.post.postFriends,
  getPostsMe: (state: any) => state.post.postOfMe,
  getPostsUser: (state: any) => state.post.postOfUser,
  getPostDetail: (state: any) => state.post.detailPost,
};
