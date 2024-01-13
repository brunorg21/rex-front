"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Separator } from "@/components/ui/separator";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

const signUpFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type SignInFormData = z.infer<typeof signUpFormSchema>;

export default function SignIn() {
  const { signIn, loginIsPeding } = useContext(AuthContext);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: SignInFormData) {
    await signIn(data);
  }

  return (
    <>
      <div className="flex flex-col justify-start antialiased w-full">
        <h1 className="text-3xl font-bold">Fazer Login</h1>
        <span className="text-sm text-muted-foreground">
          Insira seus dados para acessar nosso site
        </span>
      </div>

      <Separator orientation="horizontal" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-4 w-full"
        >
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

          <Button variant="default" disabled={loginIsPeding} type="submit">
            {loginIsPeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Entrar
          </Button>
        </form>
      </Form>
    </>
  );
}
