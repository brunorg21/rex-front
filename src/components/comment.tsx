import {
  MessageCircleIcon,
  MoreVertical,
  PencilIcon,
  PencilLineIcon,
  Repeat2Icon,
  ThumbsUp,
  Trash2Icon,
} from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardHeader, CardContent } from "./ui/card";

interface CommentProps {
  isCommentRelated?: boolean;
}

export function Comment({ isCommentRelated = false }: CommentProps) {
  return (
    <Card className={`shadow-md ${isCommentRelated && "w-[90%]"}`}>
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
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
          quos tempore architecto quidem laudantium itaque, perferendis omnis,
          officiis fuga unde culpa quasi nesciunt reprehenderit, quo nostrum
          explicabo commodi consequatur aperiam.
        </p>
        <div className="flex gap-2 justify-end">
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
      </CardContent>
    </Card>
  );
}
