"use client";

import { SignUpFormData } from "@/app/auth/sign-up/page";
import { SignInFormData } from "@/app/auth/sign-in/page";
import { client } from "@/lib/axios-client";
import { IUser, UserData } from "@/models/user-model";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { AxiosResponse } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserData;
  setUser: Dispatch<SetStateAction<UserData>>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData>({} as UserData);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
