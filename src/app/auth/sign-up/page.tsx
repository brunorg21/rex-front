"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useContext } from "react";

import { useUserMutation } from "@/api/useUserMutation";
import { AuthContext } from "@/context/auth-context";

const signInFormSchema = z
  .object({
    username: z.string().min(5, {
      message: "Usuário deve conter no minímo 5 caracteres",
    }),
    name: z.string().min(5, {
      message: "Nome deve conter no minímo 5 caracteres",
    }),
    email: z.string().email({
      message: "Insira um e-mail válido",
    }),
    password: z
      .string()
      .max(20, {
        message: "Senha deve conter no máximo 20 caracteres",
      })
      .min(6, {
        message: "Senha deve conter no minímo 6 caracteres",
      }),
    confirmPassword: z
      .string()
      .max(20, {
        message: "Senha deve conter no máximo 20 caracteres",
      })
      .min(6, {
        message: "Senha deve conter no minímo 6 caracteres",
      }),
  })
  .refine((form) => form.password === form.confirmPassword, {
    message: "Senhas devem ser iguais!",
    path: ["confirmPassword"],
  });
export type SignUpFormData = z.infer<typeof signInFormSchema>;

export default function SignUp() {
  const { signUp, createUserIsPending } = useContext(AuthContext);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      username: "",
    },
  });

  async function handleCreateUser(data: SignUpFormData) {
    await signUp(data);
  }

  return (
    <>
      <div className="flex flex-col antialiased justify-start w-full">
        <h1 className="text-3xl font-bold">Cadastrar-se</h1>
        <span className="text-sm text-muted-foreground">
          Crie seu usuário para acessar nosso site
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateUser)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted"
                    type="text"
                    placeholder="Usuário"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted"
                    type="text"
                    placeholder="Nome"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted"
                    type="password"
                    placeholder="Senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-muted"
                    type="password"
                    placeholder="Confirmar senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            disabled={createUserIsPending}
            type="submit"
          >
            {createUserIsPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar conta
          </Button>
        </form>
      </Form>
    </>
  );
}
