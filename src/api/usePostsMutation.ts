import { SignInFormData } from "@/app/auth/sign-in/page";
import { SignUpFormData } from "@/app/auth/sign-up/page";
import { client } from "@/lib/axios-client";
import { IUser } from "@/models/user-model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

export const usePostsMutation = () => {
  async function getAllPosts() {
    const response = await client().get<IUser>("/getAllPost");

    return response;
  }

  const fetchAllPosts = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const data = await getAllPosts();

      return data;
    },
  });

  return {
    fetchAllPosts,
  };
};
