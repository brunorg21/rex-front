import { Comment } from "@/components/comment";
import { Post } from "@/components/post";
import { Separator } from "@/components/ui/separator";

export default function UniqueComment({
  params,
}: {
  params: { comment_id: string };
}) {
  return (
    <div className="space-y-4">
      <Post withoutComments />

      <Comment />
      <div className="flex">
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col items-end gap-4">
          <Comment isCommentRelated />
          <Comment isCommentRelated />
          <Comment isCommentRelated />
        </div>
      </div>
      <Comment />
      <div className="flex">
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col items-end gap-4">
          <Comment isCommentRelated />
          <Comment isCommentRelated />
          <Comment isCommentRelated />
        </div>
      </div>
    </div>
  );
}
