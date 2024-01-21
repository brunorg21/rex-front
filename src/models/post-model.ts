import { IAttachment } from "./attachment-model";
import { IComment } from "./comment-model";

export interface IPost {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
  userId: number;
  attachments: IAttachment;
  comments: IComment[];
  likesCount: number;
}
