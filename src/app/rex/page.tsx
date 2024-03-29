"use client";
import { Post } from "@/components/post";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios-client";
import { IPost } from "@/models/post-model";
import { useQuery } from "@tanstack/react-query";
import { FileX2, Loader2 } from "lucide-react";

export default function Posts() {
  const { data, isFetching } = useQuery<IPost[]>({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const response = await api.get("/allPosts");

      return response.data;
    },
  });

  return (
    <>
      {isFetching ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className=" h-20 w-20 animate-spin" />
        </div>
      ) : (
        <>
          {data?.length !== 0 ? (
            <>
              {data?.map((post: IPost) => (
                <div key={post.id}>
                  <Post withoutComments actualPost={post} />
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-12 h-56 text-xl">
              <div className="flex gap-2">
                Ainda não temos nenhuma publicação, para começar clique em
                <strong>Nova Publicação</strong>
              </div>
              <div>
                <FileX2 size={60} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
