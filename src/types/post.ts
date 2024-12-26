export interface IPost {
  id: number;
  userId: number;
  state: string;
  fullName: string;
  imageUrl: string;
  createdAt: string;
  content: string;
  imageUrls: string[];
  shareId: string;
  sharePost: IPost;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  comments: IComment[];
  hasLike: boolean;
  type: string;
  group: any;
  groupId: number;
}

export interface IComment {
  id: string;
  postId: number;
  userId: number;
  fullName: string;
  imageUrl: string;
  comment: string;
  createdAt: string;
  canDelete: boolean;
}

export enum State {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum Type {
  GROUP = "GROUP",
  USER = "USER",
}
