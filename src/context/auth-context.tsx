"use client";

import { SignUpFormData } from "@/app/auth/sign-up/page";
import { SignInFormData } from "@/app/auth/sign-in/page";

import { UserData } from "@/models/user-model";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { useUserService } from "@/api/user-service";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/axios-client";
import { AxiosError, isAxiosError } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserData | null;
  signIn: (data: SignInFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  setUser: Dispatch<SetStateAction<UserData | null>>;
  disconnectUser: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  const { login, createUser, signOut, me } = useUserService();

  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("@token");
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    async function recoverUser() {
      try {
        const response = await me();

        setUser(response.data.user);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    }

    if (token) {
      recoverUser();
    } else {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  async function disconnectUser() {
    await signOut();
    localStorage.removeItem("@token");
    push("/");
  }

  async function signIn(data: SignInFormData) {
    try {
      const res = await login(data);

      api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem("@token", res.data.token);
      setUser(res.data.user);
      push("/rex");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
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
        setUser,
        signIn,
        signUp,
        disconnectUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
