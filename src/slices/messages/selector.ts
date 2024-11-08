export const selectMessage = {
  getListMessages: (state: any) => state.message.messages,
};

export const selectMessageDetail = {
  getMessagesDetail: (state: any) => state.message.messagesDetail,
};
