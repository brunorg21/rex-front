"use client";

import { SignUpFormData } from "@/app/auth/sign-up/page";
import { SignInFormData } from "@/app/auth/sign-in/page";

import { UserData } from "@/models/user-model";
import { ReactNode, createContext, useEffect, useState } from "react";

import { useUserService } from "@/api/user-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios-client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserData | null;
  signIn: (data: SignInFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;

  disconnectUser: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  const { login, createUser, signOut, me } = useUserService();

  const { push } = useRouter();

  useEffect(() => {
    async function recoverUser() {
      const token = getCookie("@token");

      if (token) {
        const response = await me(token);

        setUser(response.data.user);
      } else {
        push("/auth/sign-in");
      }
    }
    recoverUser();
    push("/rex");
  }, []);

  async function disconnectUser() {
    await signOut();
    deleteCookie("@token");
    push("/");
  }

  async function signIn(data: SignInFormData) {
    const res = await login(data);
    api.defaults.withCredentials = true;

    setCookie("@token", res.data.token);
    setUser(res.data.user);

    push("/rex");
  }

  async function signUp(data: SignUpFormData) {
    const res = await createUser(data);

    if (res.status === 201) {
      toast.success("Usuário criado com sucesso!");
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      localStorage.setItem("@token", res.data.token);
      push("/auth/sign-in");
    } else {
      toast.error("Ocorreu um erro ao criar o usuário!");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,

        disconnectUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
