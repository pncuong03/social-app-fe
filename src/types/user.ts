export interface IUser {
  id: string;
  fullName: string;
  birthdayString: string;
  gender: string;
  work: string;
  description: string;
  live: string;
  imageUrl: string;
  backgroundUrl: string;
  state?: string;
}

export interface IFriend {
  id: string;
  fullName: string;
  imageUrl: string;
}

export interface ISearchUser {
  id: string;
  fullName: string;
  imageUrl: string;
  isFriend: boolean;
  hadSendFriendRequest: boolean;
  hadReceiverFriendRequest: boolean;
}

export enum StateUser {
  STRANGER = "STRANGER",
  REQUESTING = "REQUESTING",
  FRIEND = "FRIEND",
}
export interface IUserInfo {
  id: number;
  chatId: number;
  mutalFriends: number;
  totalFriends: number;
  fullName: string;
  imageUrl: string;
  imageBackground: string;
  description: string;
  state: string;
}

export interface Image {
  id: number;
  postId: number;
  userId: number;
  imageUrl: string;
  state: string;
  createdAt: string;
}
