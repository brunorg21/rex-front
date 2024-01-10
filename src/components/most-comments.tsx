"use client";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { UserAvatar } from "./user-avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Flame } from "lucide-react";
import { TrendingTag } from "./trending-tag";

const users = [
  {
    id: 1,
    name: "Bruno",
    username: "@bruno",
  },
  {
    id: 2,
    name: "Lucas",
    username: "@bruno",
  },
  {
    id: 3,
    name: "Pedro",
    username: "@bruno",
  },
  {
    id: 4,
    name: "João",
    username: "@bruno",
  },
  {
    id: 5,
    name: "Maria",
    username: "@bruno",
  },
];

export function MostComment() {
  const [searchUser, setSearchUser] = useState<string>("");
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUser.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-4">
      <Command>
        <CommandInput
          onValueChange={(e) => setSearchUser(e)}
          placeholder="Procure por um amigo..."
        />
        {searchUser && (
          <div className="flex flex-col gap-1.5">
            {filteredUsers.map((user) => (
              <>
                <Button
                  className="flex h-20 justify-start gap-2 p-4"
                  variant={"secondary"}
                  key={user.id}
                >
                  <UserAvatar />
                  <div className="flex flex-col">
                    <span className="text-xl">{user.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {user.username}
                    </span>
                  </div>
                </Button>
                <Separator />
              </>
            ))}
          </div>
        )}
      </Command>

      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center ">
            Em alta <Flame className="h-8 w-8" />
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <TrendingTag tag="Viagem" postsRelated={200} />
          <TrendingTag tag="Paisagem" postsRelated={200} />
          <TrendingTag tag="Natureza" postsRelated={200} />
          <TrendingTag tag="Brasil" postsRelated={200} />
          <TrendingTag tag="Política" postsRelated={200} />
          <TrendingTag tag="PT" postsRelated={200} />
        </CardContent>
      </Card>
    </div>
  );
}
