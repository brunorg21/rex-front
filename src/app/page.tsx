"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/logo.png";
import { Separator } from "@/components/ui/separator";
import { Contact2Icon, GithubIcon, LinkedinIcon, Loader2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { api } from "@/lib/axios-client";

const feedbackFormSchema = z.object({
  email: z.string().email({
    message: "Digite um e-mail válido",
  }),
  message: z.string().min(15, {
    message: "Mensagem deve ter no minímo 15 caracteres",
  }),
});

type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

export default function Home() {
  const feedbackForm = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const router = useRouter();

  async function handleSendFeedback(data: FeedbackFormData) {
    await api.post("/send", data);
  }

  return (
    <div className="flex flex-col text-secondary-foreground p-3  h-screen">
      <header className="flex justify-between items-center">
        <Image src={logo} width={90} height={90} alt="Logo" />

        <div className="flex gap-5 justify-center items-center">
          <Button title="Github" variant="ghost" size="icon">
            <Link href="https://github.com/brunorg21">
              <GithubIcon />
            </Link>
          </Button>
          <Button title="LinkedIn" variant="ghost" size="icon">
            <Link href="https://www.linkedin.com/in/devbrunor/">
              <LinkedinIcon />
            </Link>
          </Button>
        </div>
        <div className="flex gap-5 items-center">
          <span>Desenvolvido com ❤️ por Bruno Rafael</span>
          <Button onClick={() => router.push("/auth/sign-in")} variant="ghost">
            Entrar
          </Button>
          <Button onClick={() => router.push("/auth/sign-up")} variant="ghost">
            Cadastre-se
          </Button>
        </div>
      </header>
      <Separator />

      <main className="flex items-center justify-center h-screen gap-52">
        <p className="text-6xl max-w-xl p-4 ">
          Seus momentos mais incríveis merecem ser compartilhados no{" "}
          <strong className="text-primary">Rex</strong>!
        </p>
        <Card className="w-[550px]  border-muted">
          <CardHeader>
            <CardTitle>Mensagem de apoio</CardTitle>
            <CardDescription>Deixe sua mensagem de motivação.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...feedbackForm}>
              <form
                onSubmit={feedbackForm.handleSubmit(handleSendFeedback)}
                className="flex flex-col gap-4 w-full"
              >
                <FormField
                  control={feedbackForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="bg-muted"
                          type="email"
                          placeholder="E-mail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={feedbackForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="bg-muted"
                          placeholder="O que você tem a dizer..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {feedbackForm.formState.isSubmitted && (
                  <p className="text-sm text-primary">
                    Mensagem Enviada! Agradecemos o feedback!
                  </p>
                )}

                <Button
                  variant="default"
                  disabled={feedbackForm.formState.isSubmitting}
                  type="submit"
                >
                  {feedbackForm.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Enviar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
