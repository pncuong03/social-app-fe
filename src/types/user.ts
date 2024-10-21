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
