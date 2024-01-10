import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  size?: "lg" | "sm";
}

export function UserAvatar({ size = "sm" }: UserAvatarProps) {
  return (
    <Avatar className={`${size === "lg" ? "h-24 w-24" : "h-12 w-12"}`}>
      <AvatarImage src="https://github.com/brunorg21.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
