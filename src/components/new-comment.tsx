import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { UserAvatar } from "./user-avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios-client";
import { queryClient } from "@/context/react-query-provider";
import { IComment } from "@/models/comment-model";
import { IPost } from "@/models/post-model";
import { Dispatch, useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";

const newCommentSchema = z.object({
  comment: z.string().max(200),
});

type NewCommentFormData = z.infer<typeof newCommentSchema>;

interface NewCommentProps {
  postId: number;
  commentToEdit: IComment | null;
  setCommentToEdit: Dispatch<React.SetStateAction<IComment | null>>;
}

export function NewComment({
  postId,
  commentToEdit,
  setCommentToEdit,
}: NewCommentProps) {
  const { user } = useContext(AuthContext);
  const form = useForm<NewCommentFormData>({
    resolver: zodResolver(newCommentSchema),
    defaultValues: {
      comment: commentToEdit ? commentToEdit.comment : "",
    },
  });

  useEffect(() => {
    if (commentToEdit) {
      form.setValue("comment", commentToEdit.comment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentToEdit]);

  const { mutate: createComment } = useMutation({
    mutationFn: async (newComment: NewCommentFormData) => {
      return await api.post(`/comment/${postId}`, newComment);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
    },
  });
  const { mutate: editComment } = useMutation({
    mutationFn: async (newComment: NewCommentFormData) => {
      return await api.put(
        `/comment/${commentToEdit && commentToEdit.id}`,
        newComment
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      setCommentToEdit(null);
    },
  });

  async function handleCreateComment(data: NewCommentFormData) {
    if (!commentToEdit) {
      createComment(data);
    } else {
      editComment(data);
    }
    form.reset({
      comment: "",
    });
  }

  return (
    <div className="space-y-4">
      <UserAvatar
        avatarUrl={user?.avatarUrlId}
        name={user && user.name}
        username={user && user.username}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateComment)}
          className="flex flex-col gap-2 w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Diga o que está pensando sobre a postagem...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="flex gap-2 w-28" variant="default">
            Adicionar <Plus size={15} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
