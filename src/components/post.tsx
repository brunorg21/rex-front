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
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

interface PostProps {
  withoutComments?: boolean;
  actualPost: IPost;
  postLoading?: boolean;
}

export function Post({
  withoutComments = false,
  actualPost,
  postLoading,
}: PostProps) {
  const { push } = useRouter();

  return (
    <Card className="shadow-md border-muted">
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <UserAvatar />
            <div className="flex flex-col gap-0.5">
              <strong className="text-lg">Bruno Rafael</strong>

              <span className="text-muted-foreground text-sm">@bruno</span>
            </div>
          </div>

          <Popover>
            <PopoverTrigger>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-40 space-y-4">
              <Button
                variant="destructive"
                className="flex gap-4 justify-start"
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
        </div>
        <Separator />
        <CardTitle>{actualPost.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p>{actualPost.content}</p>
        <div className="flex gap-4">
          <Badge variant="outline">#viagem</Badge>

          <Badge variant="outline">#paisagem</Badge>

          <Badge variant="outline">#praia</Badge>
        </div>

        <img
          className="rounded-md max-h-96 object-cover"
          src={actualPost.attachments.path}
          alt="Postagem"
          width={600}
          height={300}
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
