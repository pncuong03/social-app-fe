export const selectUserInfo = {
  getUserInfo: (state: any) => state.auth.user,
};

export const selectAccessToken = {
  getToken: (state: any) => state.auth.accessToken,
};
