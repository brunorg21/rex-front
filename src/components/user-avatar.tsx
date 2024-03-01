import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  size?: "lg" | "sm";
  avatarUrl: string | null | undefined;
  name: string | null;
  username: string | null;
}

export function UserAvatar({
  size = "sm",
  avatarUrl,
  name,
  username,
}: UserAvatarProps) {
  return (
    <div className="flex gap-4">
      <Avatar
        className={`${size === "lg" ? "h-[115px] w-[120px]" : "h-12 w-12"}`}
      >
        {avatarUrl && (
          <Image
            className="object-cover"
            src={`https://drive.google.com/uc?export=view&id=${avatarUrl}`}
            alt="Foto usuário"
            width={200}
            height={200}
          />
        )}

        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <strong className="text-lg">{name}</strong>

        <span className="text-muted-foreground text-sm">@{username}</span>
      </div>
    </div>
  );
}
