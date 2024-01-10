"use client";
import PostModal from "@/components/create-post-modal/create-post-modal";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Home, LogOutIcon, Plus, UserRound } from "lucide-react";
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { MostComment } from "@/components/most-comments";
import { useRouter } from "next/navigation";

export default function PostLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-6">
        <section className="flex flex-col justify-between sm:col-span-1 h-[55rem] overflow-hidden sticky top-0">
          <div className="flex flex-col p-4 rounded-sm min-h-[40rem] gap-4">
            <div className="flex gap-6">
              <UserAvatar size="lg" />

              <div className="flex flex-col">
                <strong className="text-secondary-foreground text-lg">
                  Bruno Rafael Gomes Silva
                </strong>
                <span className="text-muted-foreground text-lg">
                  bruno@email.com
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex gap-4 text-md" variant="outline">
                    <Plus />
                    Nova publicação
                  </Button>
                </DialogTrigger>
                <PostModal />
              </Dialog>

              <Button
                className="flex relative justify-start gap-4 w-full text-lg"
                variant="ghost"
                size="lg"
              >
                <span className="absolute text-center top-0 bottom-2 left-10 bg-red-600 rounded-full w-5 h-5 text-sm">
                  0
                </span>
                <Bell />
                Notificações
              </Button>
              <Button
                className="flex gap-4 justify-start w-full text-lg"
                variant="ghost"
                size="lg"
                onClick={() => router.push("/rex/user/1")}
              >
                <UserRound />
                Meu Perfil
              </Button>
              <Button
                className="flex gap-4 justify-start w-full text-lg"
                variant="ghost"
                size="lg"
                onClick={() => router.push("/rex")}
              >
                <Home />
                Página Inicial
              </Button>
            </div>
          </div>
          <div className="flex space-x-6 p-4">
            <Button variant="ghost" className="flex gap-2">
              <LogOutIcon /> Sair
            </Button>
            <ThemeToggle />
          </div>
        </section>
        <main className="flex flex-col gap-4 col-span-1 sm:col-span-2 overflow-y-auto">
          {children}
        </main>
        <section className="col-span-1 h-[55rem] sticky top-0">
          <MostComment />
        </section>
      </div>
    </div>
  );
}
