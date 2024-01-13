export interface IComment {
  id: number;
  comment: string;
  postId: number;
  userId: number;
  createdAt: Date;
}
