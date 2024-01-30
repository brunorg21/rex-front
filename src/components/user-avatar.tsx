import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  size?: "lg" | "sm";
  avatarUrl: string | null | undefined;
}

export function UserAvatar({ size = "sm", avatarUrl }: UserAvatarProps) {
  return (
    <Avatar className={`${size === "lg" ? "h-24 w-24" : "h-12 w-12"}`}>
      <AvatarImage src={`http://localhost:3333${avatarUrl}`} />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
}
