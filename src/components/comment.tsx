import {
  MessageCircleIcon,
  MoreVertical,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { IComment } from "@/models/comment-model";
import { Dispatch, useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios-client";
import { queryClient } from "@/context/react-query-provider";
import { IPost } from "@/models/post-model";
import { toast } from "sonner";
import { getDistanceTime } from "@/utils/get-distance-time-between-date";

interface CommentProps {
  isCommentRelated?: boolean;
  actualComment: IComment;
  setCommentToEdit: Dispatch<React.SetStateAction<IComment | null>>;
}

export function Comment({
  isCommentRelated = false,
  actualComment,
  setCommentToEdit,
}: CommentProps) {
  const { user } = useContext(AuthContext);

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: number) => {
      return await api.delete(`/comment/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["uniquePost"] });

      toast.success("Comentário deletado");
    },
    onError: () => {
      toast.error("Erro ao deletar comentário");
    },
  });

  return (
    <Card className={`shadow-md ${isCommentRelated && "w-[90%]"}`}>
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <UserAvatar
            avatarUrl={actualComment.user?.avatarUrlId}
            name={actualComment.user.name}
            username={actualComment.user.username}
          />

          {actualComment.userId === user?.id && (
            <Popover>
              <PopoverTrigger>
                <MoreVertical />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col w-40 space-y-4">
                <Button
                  onClick={() => deleteComment(actualComment.id)}
                  variant="destructive"
                  className="flex gap-4 justify-start"
                >
                  <Trash2Icon className="h-5 w-5" />
                  <span>Excluir</span>
                </Button>
                <Button
                  onClick={() => setCommentToEdit(actualComment)}
                  variant="ghost"
                  className="flex gap-4 justify-start"
                >
                  <PencilLineIcon className="h-5 w-6" />
                  <span>Editar</span>
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col space-y-4">
        <CardTitle className="flex justify-end text-sm">
          {getDistanceTime(actualComment.createdAt)}
        </CardTitle>
        <p>{actualComment.comment}</p>
      </CardContent>
    </Card>
  );
}
