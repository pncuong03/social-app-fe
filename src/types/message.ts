export interface IMessage {
  id: string;
  userId: string;
  message: string;
  fullName: string;
  imageUrl: string;
  isMe: boolean;
  createdAt: string;
}
