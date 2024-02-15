import { api } from "@/lib/axios-client";

export async function getCommentsById(postId: number) {
  const response = await api.get(`/comment/${postId}`);

  return response.data;
}
