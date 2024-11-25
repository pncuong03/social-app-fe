import { IPost } from "./post";
import { IFriend } from "./user";

export interface INotification {
  id: number;
  type: string;
  userId: number;
  interacId: number;
  groupId: number;
  interactType: string;
  postId: number;
  hasSeen: boolean;
  createdAt: string;
  interact: IFriend;
  group: {
    id: number;
    name: string;
  };
  post: IPost;
}

export interface INotiCount {
  messageCount: number;
  notificationCount: number;
}
