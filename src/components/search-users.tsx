import { UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Command, CommandInput } from "./ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/models/user-model";
import { api } from "@/lib/axios-client";
import { useRouter } from "next/navigation";

export function SearchUsers() {
  const [queryUser, setQueryUser] = useState<string>("");
  const { push } = useRouter();

  const { data: users } = useQuery<UserData[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users`);

      return response.data;
    },
  });
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(queryUser.toLowerCase()) ||
      user.username.toLowerCase().includes(queryUser.toLowerCase())
  );
  return (
    <Command>
      <CommandInput
        onValueChange={(e) => setQueryUser(e)}
        placeholder="Procure por um amigo..."
      />
      {queryUser && (
        <div className="flex flex-col gap-1.5">
          {filteredUsers?.map((user) => (
            <>
              <Button
                onClick={() => {
                  push(`/rex/user/${user.id}`);
                  setQueryUser("");
                }}
                className="flex h-20 justify-start gap-2 p-4"
                variant={"secondary"}
                key={user.id}
              >
                <Avatar className={"w-[60px] h-[60px]"}>
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.avatar_url}`}
                  />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-md">{user.name}</span>
                  <span className="text-muted-foreground">
                    @{user.username}
                  </span>
                </div>
              </Button>
              <Separator />
            </>
          ))}
        </div>
      )}
    </Command>
  );
}
