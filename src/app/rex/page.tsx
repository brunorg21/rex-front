import { Post } from "@/components/post";
import { api } from "@/lib/axios-client";
import { IPost } from "@/models/post-model";

import { cookies } from "next/headers";

async function getPosts(token: string) {
  return await api.get("/allPosts", {
    headers: {
      Cookie: `auth=${token}`,
    },
  });
}

export default async function Posts() {
  const token = cookies().get("auth")?.value;
  const { data } = await getPosts(token!);

  return (
    <>
      {data?.map((post: IPost) => (
        <div key={post.id}>
          <Post withoutComments actualPost={post} />
        </div>
      ))}
    </>
  );
}
