"use client";

import EditProfileModal from "@/components/edit-profile-modal/edit-profile-modal";
import { Post } from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { AuthContext } from "@/context/auth-context";
import { api } from "@/lib/axios-client";
import { IFollower } from "@/models/follower-model";
import { IPost } from "@/models/post-model";
import { UserData } from "@/models/user-model";
import { useQuery } from "@tanstack/react-query";
import { Plus, UserIcon } from "lucide-react";
import { useContext } from "react";

export default function User({ params }: { params: { user_id: string } }) {
  const { user: currentUser } = useContext(AuthContext);
  const { data: postsByUser } = useQuery({
    queryKey: ["postsByUser"],
    queryFn: async () => {
      const response = await api.get(`/post/user/${params.user_id}`);

      return response.data;
    },
  });
  const { data: user } = useQuery<UserData>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get(`/user/${params.user_id}`);

      return response.data;
    },
  });
  const { data: followers } = useQuery<IFollower[]>({
    queryKey: ["followers"],
    queryFn: async () => {
      const response = await api.get(`/follower/${params.user_id}`);

      return response.data;
    },
  });

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-center">
        <Avatar className="w-[280px] h-[280px]">
          <AvatarImage
            className="object-cover"
            src={`http://localhost:3333${user?.avatar_url}`}
          />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </div>
      <Separator />

      <div className="flex justify-between">
        <div className="flex flex-col space-y-2">
          <span>{user?.name}</span>
          <span className="text-muted-foreground">@{user?.username}</span>

          <p>{user?.bio}</p>

          <div className="flex space-x-4">
            <span className="flex gap-2">
              <UserIcon /> {followers?.length} seguidores
            </span>
            <span className="flex gap-2">
              <UserIcon /> 20 seguindo
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {user?.id === currentUser?.id && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-4 text-md" variant="outline">
                  Editar Perfil
                </Button>
              </DialogTrigger>
              <EditProfileModal currentUser={user!} />
            </Dialog>
          )}

          <Button variant="outline" className="flex items-center gap-2 text-md">
            Seguir
            <Plus size={18} />
          </Button>
        </div>
      </div>

      <Separator orientation="horizontal" />

      {postsByUser?.map((post: IPost) => {
        return (
          <div key={post.id}>
            <Post withoutComments actualPost={post} />
          </div>
        );
      })}
    </div>
  );
}
