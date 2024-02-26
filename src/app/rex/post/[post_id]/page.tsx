"use client";

import { Post } from "@/components/post";
import { api } from "@/lib/axios-client";
import { IPost } from "@/models/post-model";
import { useQuery } from "@tanstack/react-query";

export default function UniquePost({
  params,
}: {
  params: { post_id: string };
}) {
  const { data: uniquePost, isFetching: loadingUniquePost } = useQuery<IPost[]>(
    {
      queryKey: ["uniquePost"],
      queryFn: async () => {
        const { data } = await api.get<IPost[]>(`/post/${params.post_id}`);

        return data;
      },
    }
  );

  return (
    <div>
      {uniquePost?.map((post) => (
        <div key={post.id}>
          <Post actualPost={post} />
        </div>
      ))}
    </div>
  );
}
