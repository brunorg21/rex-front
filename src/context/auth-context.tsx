"use client";

import { SignUpFormData } from "@/app/auth/sign-up/page";
import { SignInFormData } from "@/app/auth/sign-in/page";

import { UserData } from "@/models/user-model";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useUserMutation } from "@/api/useUserMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { client } from "@/lib/axios-client";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserData;
  signIn: (data: SignInFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  loginIsPeding: boolean;
  createUserIsPending: boolean;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData>({} as UserData);

  const {
    login: { mutate, isPending: loginIsPeding },
    createUser: { mutate: createUserMutate, isPending: createUserIsPending },
  } = useUserMutation();

  const { push } = useRouter();

  useEffect(() => {
    async function recoverUser() {
      const token = getCookie("@token");

      if (token) {
        await client({
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .get("/me")
          .then((response: AxiosResponse) => setUser(response.data.user));

        push("/rex");
      } else {
        push("/auth/sign-in");
      }
    }

    recoverUser();
  }, []);

  function signOut() {
    deleteCookie("@token");
    push("/");
  }

  async function signIn(data: SignInFormData) {
    mutate(data, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      },
      onSuccess: (res) => {
        setUser(res.data.user);
        push("/rex");
      },
    });
  }

  async function signUp(data: SignUpFormData) {
    createUserMutate(data, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {
            cancel: {
              label: "Fechar",
              onClick: () => toast.dismiss(),
            },
          });
        }
      },
      onSuccess: (res) => {
        toast.success("Usuário criado com sucesso!");
        setUser(res.data.user);
      },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        createUserIsPending,
        loginIsPeding,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
