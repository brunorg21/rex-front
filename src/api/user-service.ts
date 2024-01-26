import { SignInFormData } from "@/app/auth/sign-in/page";
import { SignUpFormData } from "@/app/auth/sign-up/page";
import { api } from "@/lib/axios-client";
import { CookieValueTypes } from "cookies-next";

export const useUserService = () => {
  async function login(data: SignInFormData) {
    return await api.post("/user/login", data, {
      withCredentials: true,
    });
  }

  async function createUser(data: SignUpFormData) {
    return await api.post("/user", data);
  }

  async function signOut() {
    return await api.get("/sign-out");
  }

  async function me() {
    return await api.get("/me");
  }

  return {
    login,
    createUser,
    signOut,
    me,
  };
};
