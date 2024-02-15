import { IUser, UserData } from "./user-model";

export interface IComment {
  id: number;
  comment: string;
  postId: number;
  userId: number;
  createdAt: Date;
  user: UserData;
}
