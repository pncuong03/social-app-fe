export interface IGroup {
  idGroup: number;
  imageUrl: string;
  name: string;
  memberCount: number;
}

export interface ISearchGroup {
  id: number;
  name: string;
  imageUrl: string;
  memberCount: number;
  isInGroup: boolean;
  isRequestJoin: boolean;
}

export interface IMemberGroup {
  id: string;
  fullName: string;
  imageUrl: string;
  description: string;
  imageBackground: string;
}
