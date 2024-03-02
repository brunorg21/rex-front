"use client";
import PostModal from "@/components/create-post-modal/create-post-modal";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Bell,
  Home,
  LogOutIcon,
  Plus,
  UserIcon,
  UserRound,
} from "lucide-react";
import { ReactNode, useContext } from "react";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchUsers } from "@/components/search-users";
import Image from "next/image";

export default function PostLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { user, disconnectUser } = useContext(AuthContext);

  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-4 gap-3 p-6">
        <section className="flex flex-col justify-between md:col-span-1 h-[55rem] overflow-hidden md:sticky top-0">
          <div className="flex flex-col p-4 rounded-sm min-h-[40rem] gap-4">
            <div className="flex gap-6 md:flex-col lg:flex-row">
              <Avatar className={"w-[120px] h-[120px]"}>
                <AvatarImage asChild>
                  <Image
                    className="object-cover"
                    src={`https://drive.google.com/uc?export=view&id=${user?.avatarUrlId}`}
                    alt="Foto usuário"
                    width={200}
                    height={200}
                  />
                </AvatarImage>

                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <strong className="text-secondary-foreground text-lg">
                  {user ? (
                    <>{user.name}</>
                  ) : (
                    <Skeleton className="h-3 w-[150px]" />
                  )}
                </strong>
                <span className="text-muted-foreground text-lg">
                  {user ? (
                    <> @{user.username}</>
                  ) : (
                    <Skeleton className="h-5 w-[150px]" />
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex gap-4 text-md " variant="outline">
                    <Plus size={20} />
                    Nova publicação
                  </Button>
                </DialogTrigger>
                <PostModal />
              </Dialog>

              <Button
                className="flex gap-4 justify-start text-md"
                variant="ghost"
                size="default"
                onClick={() => router.push(`/rex/user/${user?.id}`)}
              >
                <UserRound size={20} />
                Meu Perfil
              </Button>
              <Button
                className="flex gap-4 justify-start text-md"
                variant="ghost"
                size="default"
                onClick={() => router.push("/rex")}
              >
                <Home size={20} />
                Página Inicial
              </Button>
            </div>
          </div>
          <div className="flex space-x-6 p-4">
            <Button
              onClick={async () => await disconnectUser()}
              variant="ghost"
              className="flex gap-2"
            >
              <LogOutIcon /> Sair
            </Button>
            <ThemeToggle />
          </div>
        </section>
        <main className="flex flex-col gap-4 col-span-1 md:col-span-2  overflow-y-auto">
          {children}
        </main>
        <section>
          <SearchUsers />
        </section>
      </div>
    </div>
  );
}
