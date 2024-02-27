"use client";

import EditProfileModal from "@/components/edit-profile-modal/edit-profile-modal";
import { Post } from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { AuthContext } from "@/context/auth-context";
import { queryClient } from "@/context/react-query-provider";
import { api } from "@/lib/axios-client";
import { IFollowerData } from "@/models/follower-model";
import { IPost } from "@/models/post-model";
import { UserData } from "@/models/user-model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Plus, UserIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function User({ params }: { params: { user_id: string } }) {
  const { user: currentUser } = useContext(AuthContext);
  const [isHovering, setIsHovering] = useState<boolean>(false);
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
  const { data: followers } = useQuery<IFollowerData>({
    queryKey: ["followers"],
    queryFn: async () => {
      const response = await api.get(`/follower/${params.user_id}`);

      return response.data;
    },
  });

  const { mutate: createFollower } = useMutation({
    mutationFn: async (follower: any) => {
      return await api.post(`/follower`, follower);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });

      toast.success(`Seguindo @${response.data.username}`);
    },
  });
  const { mutate: deleteFollower } = useMutation({
    mutationFn: async (follower: any) => {
      return await api.delete(`/follower/${follower.followerId}`);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
    },
  });

  const isUserFollowing = followers?.followersRelated.find(
    (follower) => follower.follower_username === currentUser?.username
  );

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-center">
        <Avatar className="w-[180px] h-[180px]">
          <AvatarImage
            className="object-cover"
            src={`${process.env.NEXT_PUBLIC_API_URL}${
              user?.id === currentUser?.id
                ? currentUser?.avatar_url
                : user?.avatar_url
            }`}
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
              <UserIcon /> {followers?.followersCount}{" "}
              {followers?.followersCount === 1 ? "seguidor" : "seguidores"}
            </span>
            <span className="flex gap-2">
              <UserIcon /> {followers?.followingCount} seguindo
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {user?.id === currentUser?.id ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-4 text-md" variant="outline">
                  Editar Perfil
                </Button>
              </DialogTrigger>
              <EditProfileModal currentUser={user!} />
            </Dialog>
          ) : (
            <Button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                if (isUserFollowing) {
                  deleteFollower({
                    followerId: isUserFollowing.id,
                  });
                } else {
                  createFollower({
                    follower_username: currentUser?.username!,
                    userId: user?.id!,
                  });
                }
              }}
              variant="outline"
              className={`flex items-center gap-2 text-md ${
                isUserFollowing ? "hover:border-red-500 hover:text-red-600" : ""
              } `}
            >
              {isUserFollowing ? (
                <>
                  {isHovering ? (
                    <>
                      Deixar de seguir <X size={18} />
                    </>
                  ) : (
                    <>
                      Seguindo
                      <Check size={18} />
                    </>
                  )}
                </>
              ) : (
                <>
                  Seguir
                  <Plus size={18} />
                </>
              )}
            </Button>
          )}
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
