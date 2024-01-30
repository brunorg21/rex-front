"use client";
import {
  MessageCircleIcon,
  MoreVertical,
  PencilLineIcon,
  ThumbsUp,
  Trash2Icon,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Comment } from "./comment";
import { UserAvatar } from "./user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { IPost } from "@/models/post-model";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios-client";
import { queryClient } from "@/context/react-query-provider";
import { toast } from "sonner";
import React, { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

interface PostProps {
  withoutComments?: boolean;
  actualPost: IPost;
  postLoading?: boolean;
}

export function Post({ withoutComments = false, actualPost }: PostProps) {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);

  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId: number) => {
      return await api.delete(`/post/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      toast.success("Postagem deletada! 🗑️🗑️");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao publicar a postagem! 😭😭😭");
    },
  });

  return (
    <Card className="shadow-md border-muted">
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <UserAvatar avatarUrl={actualPost.user.avatar_url} />
            <div className="flex flex-col gap-0.5">
              <strong className="text-lg">{actualPost.user.name}</strong>

              <span className="text-muted-foreground text-sm">
                @{actualPost.user.username}
              </span>
            </div>
          </div>

          {actualPost.userId === user?.id && (
            <Popover>
              <PopoverTrigger>
                <MoreVertical />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-40 space-y-4">
                <Button
                  onClick={() => deletePost(actualPost.id)}
                  variant="ghost"
                  className="flex gap-4 justify-start text-red-700  dark:text-red-400 hover:text-red-400"
                >
                  <Trash2Icon className="h-5 w-5" />
                  <span>Excluir</span>
                </Button>
                <Button variant="ghost" className="flex gap-4 justify-start">
                  <PencilLineIcon className="h-5 w-6" />
                  <span>Editar</span>
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <Separator />
        <CardTitle>{actualPost.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p>{actualPost.content}</p>
        <div className="flex gap-4">
          {actualPost.tag.map((item) => {
            return (
              <React.Fragment key={item.tagName}>
                <Badge variant="outline">{`#${item.tagName}`}</Badge>
              </React.Fragment>
            );
          })}
        </div>

        <img
          className="rounded-md max-h-[600px] object-cover"
          src={`http://localhost:3333${actualPost.attachments?.path}`}
          alt="Postagem"
          width={600}
          height={400}
        />

        <div className="flex gap-2">
          <div className="flex content-center items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full transition ease-in-out delay-80 duration-300"
            >
              <ThumbsUp size={20} />
            </Button>

            <strong>{actualPost.likesCount}</strong>
          </div>

          <div className="flex content-center items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full transition ease-in-out delay-80 duration-300"
              onClick={() => push(`/rex/post/${actualPost.id}`)}
            >
              <MessageCircleIcon size={20} />
            </Button>

            <strong>20</strong>
          </div>
        </div>
        <Separator orientation="horizontal" />
        {!withoutComments && (
          <>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </>
        )}
      </CardContent>
    </Card>
  );
}
