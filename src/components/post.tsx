import {
  MessageCircleIcon,
  MoreVertical,
  PencilIcon,
  PencilLineIcon,
  Repeat2Icon,
  ThumbsUp,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Comment } from "./comment";
import { UserAvatar } from "./user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface PostProps {
  withoutComments?: boolean;
}

export function Post({ withoutComments = false }: PostProps) {
  return (
    <Card className="shadow-md border-muted">
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <UserAvatar />
            <div className="flex flex-col">
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
        <CardTitle>Título Postagem</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          beatae soluta velit ipsum natus excepturi magni? Optio hic quo magnam,
          repellat quasi repudiandae ad provident vero, id, excepturi voluptas
          incidunt?
        </p>
        <div className="flex gap-4">
          <Badge variant="outline">#viagem</Badge>
          <Badge variant="outline">#paisagem</Badge>
          <Badge variant="outline">#praia</Badge>
        </div>
        <img
          className="rounded-md max-h-96 object-cover"
          src="https://source.unsplash.com/random"
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

            <strong>20</strong>
          </div>
          <div className="flex content-center items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full transition ease-in-out delay-80 duration-300"
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
