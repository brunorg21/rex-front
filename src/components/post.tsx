/* eslint-disable @next/next/no-img-element */
"use client";
import {
  MessageCircleIcon,
  MoreVertical,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios-client";
import { queryClient } from "@/context/react-query-provider";
import { toast } from "sonner";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { ILikes } from "@/models/likes";
import { getCommentsById } from "@/api/comment-service";
import { IComment } from "@/models/comment-model";
import { NewComment } from "./new-comment";
import { getDistanceTime } from "@/utils/get-distance-time-between-date";

interface PostProps {
  withoutComments?: boolean;
  actualPost: IPost;
}

export function Post({ withoutComments = false, actualPost }: PostProps) {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);
  const [commentToEdit, setCommentToEdit] = useState<IComment | null>(null);
  const [userAlreadyLikeThisPost, setUserAlreadyLikeThisPost] =
    useState<boolean>(
      !!actualPost.like?.find((like) => like.userId === user?.id)
    );

  useEffect(() => {
    setUserAlreadyLikeThisPost(
      !!actualPost.like?.find((like) => like.userId === user?.id)
    );
  }, []);

  const { data: comments, isFetching: fetchingComments } = useQuery<IComment[]>(
    {
      queryKey: ["comments", actualPost.id],
      queryFn: () => getCommentsById(actualPost.id),
    }
  );

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

  const { mutate: handleLike } = useMutation({
    mutationFn: async ({ postId }: any) => {
      return api.post(`/likeOnPost/${postId}`);
    },
    onSuccess: (response) => {
      setUserAlreadyLikeThisPost(response.data.like.userId === user?.id);
      queryClient.invalidateQueries({ queryKey: ["uniquePost"] });
      queryClient.setQueryData(["allPosts"], (data: IPost[]) => {
        const postIndex = data.findIndex(
          (post) => post.id === response.data.postId
        );

        if (postIndex !== -1) {
          data[postIndex].likesCount += 1;
        }
        return [...data];
      });
    },
  });
  const { mutate: handleDeleteLike } = useMutation({
    mutationFn: async ({ postId }: any) => {
      return api.delete(`/likeOnPost/${postId}`);
    },
    onSuccess: (response) => {
      setUserAlreadyLikeThisPost(false);
      queryClient.invalidateQueries({ queryKey: ["uniquePost"] });
      queryClient.setQueryData(["allPosts"], (data: IPost[]) => {
        const postIndex = data.findIndex(
          (post) => post.id === Number(response.data.postId)
        );

        if (postIndex !== -1) {
          data[postIndex].likesCount -= 1;
        }
        return [...data];
      });
    },
  });

  return (
    <Card className="shadow-md border-muted">
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <UserAvatar
            avatarUrl={actualPost.user.avatar_url}
            name={actualPost.user.name}
            username={actualPost.user.username}
          />

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
              </PopoverContent>
            </Popover>
          )}
        </div>
        <Separator />
        <CardTitle>
          <div className="flex justify-between">
            {actualPost.title}{" "}
            <span className="text-sm text-muted-foreground">
              Publicado {getDistanceTime(actualPost.publishedAt)}
            </span>
          </div>
        </CardTitle>
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
              onClick={() => {
                if (!userAlreadyLikeThisPost) {
                  handleLike({
                    postId: actualPost.id,
                  });
                } else {
                  handleDeleteLike({
                    postId: actualPost.id,
                  });
                }
              }}
              size="icon"
              variant="outline"
              className={`rounded-full transition ease-in-out delay-80 duration-300 ${
                userAlreadyLikeThisPost && "bg-slate-800"
              }`}
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

            <strong>{actualPost.comments.length}</strong>
          </div>
        </div>
        <Separator orientation="horizontal" />
        {!withoutComments && (
          <>
            <NewComment
              setCommentToEdit={setCommentToEdit}
              commentToEdit={commentToEdit}
              postId={actualPost.id}
            />
            {comments?.map((comment) => (
              <div key={comment.id}>
                <Comment
                  setCommentToEdit={setCommentToEdit}
                  actualComment={comment}
                />
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
