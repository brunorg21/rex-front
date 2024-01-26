import { IAttachment } from "./attachment-model";
import { IComment } from "./comment-model";
import { IUser } from "./user-model";

interface IUserRelatedWithPost {
  name: string;
  avatar_url: string;
  username: string;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  userId: number;
  attachments: IAttachment;
  comments: IComment[];
  likesCount: number;
  user: IUserRelatedWithPost;
}
