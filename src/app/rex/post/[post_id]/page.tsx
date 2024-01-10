import { Post } from "@/components/post";

export default function UniquePost({ params }: { params: { postId: string } }) {
  return (
    <div>
      <Post />
    </div>
  );
}
