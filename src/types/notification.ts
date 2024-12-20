import { IPost } from "./post";

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
  interact: any;
  group: {
    id: number;
    name: string;
  };
  post: any;
}

export interface INotiCount {
  messageCount: number;
  notificationCount: number;
}
