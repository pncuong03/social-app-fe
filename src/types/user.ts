export interface IUser {
  id: string;
  fullName: string;
  imageUrl: string;
  backgroundUrl: string;
  birthday: string;
  gender: string;
  description: string;
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
