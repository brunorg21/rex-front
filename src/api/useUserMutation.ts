import { SignInFormData } from "@/app/auth/sign-in/page";
import { SignUpFormData } from "@/app/auth/sign-up/page";
import { client } from "@/lib/axios-client";
import { IUser } from "@/models/user-model";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

export const useUserMutation = () => {
  async function signUp(user: SignUpFormData) {
    const response = await client().post<IUser>("/user", user);

    return response;
  }

  async function signIn({ email, password }: SignInFormData) {
    const response = await client().post<IUser>("/user/login", {
      email,
      password,
    });

    return response;
  }

  const login = useMutation({
    mutationFn: (body: SignInFormData) => signIn(body),
    onSuccess: (res) => {
      setCookie("@token", res.data.token, {
        maxAge: 1 * 60 * 60 * 24 * 7, // 7 dias
      });
    },
  });

  const createUser = useMutation({
    mutationFn: (body: SignUpFormData) => signUp(body),
    onSuccess: (res) => {
      setCookie("@token", res.data.token, {
        maxAge: 1 * 60 * 60 * 24 * 7, // 7 dias
      });
    },
  });

  return {
    createUser,
    login,
  };
};
