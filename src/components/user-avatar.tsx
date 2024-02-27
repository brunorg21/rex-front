import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
        <AvatarImage
          className="object-cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}${avatarUrl}`}
        />
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
