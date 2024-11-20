export const selectMessage = {
  getListMessages: (state: any) => state.message.messages,
};

export const selectMessageDetail = {
  getMessagesDetail: (state: any) => state.message.messagesDetail,
};

export const selectMemberChat = {
  getMemberChat: (state: any) => state.message.memberChat,
};

export const selectSearchChat = {
  getSearchChat: (state: any) => state.message.searchChat,
};
