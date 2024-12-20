export interface IMessage {
  id: number;
  userId?: string;
  message: string;
  fullName: string;
  imageUrl: string;
  isMe: boolean;
  createdAt: string;
  type?: string;
  chatId?: string;
}

export interface IChat {
  id: string;
  name: string;
  imageUrl: string;
  newestMessage: string;
  newestChatTime: string;
  messageCount: number;
}

export interface IMember {
  id: string;
  fullName: string;
  imageUrl: string;
  role: string;
}

export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
