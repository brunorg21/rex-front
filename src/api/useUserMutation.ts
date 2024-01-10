import { SignInFormData } from "@/app/auth/sign-in/page";
import { SignUpFormData } from "@/app/auth/sign-up/page";
import { client } from "@/lib/axios-client";
import { IUser } from "@/models/user-model";
import { useMutation } from "@tanstack/react-query";

export const useUserMutation = () => {
  async function signUp(user: SignUpFormData) {
    const response = await client().post<IUser>("/user", user);

    client().api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;
    return response;
  }

  async function signIn({ email, password }: SignInFormData) {
    const response = await client().post<IUser>("/user/login", {
      email,
      password,
    });

    client().api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;
    return response;
  }

  const login = useMutation({
    mutationFn: (body: SignInFormData) => signIn(body),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      client().api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("@token")}`;
    },
  });

  const createUser = useMutation({
    mutationFn: (body: SignUpFormData) => signUp(body),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      client().api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("@token")}`;
    },
  });

  return {
    createUser,
    login,
  };
};
