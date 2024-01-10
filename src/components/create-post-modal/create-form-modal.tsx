import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ToggleGroup } from "../ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Tag } from "../tags";

const createNewPostSchema = z.object({
  title: z.string().min(5, {
    message: "Título deve ter no minímo 5 caracteres",
  }),
  content: z.string().max(200, {
    message: "Postagem pode conter no máximo 200 caracteres",
  }),
  image: z.any().optional(),
  tags: z.array(z.string()).refine((tags) => tags.length > 3, {
    message: "Número de tags excedido!",
  }),
});

type CreateNewPostFormData = z.infer<typeof createNewPostSchema>;

export function CreateFormModal() {
  const form = useForm<CreateNewPostFormData>({
    resolver: zodResolver(createNewPostSchema),
    defaultValues: {
      content: "",
      title: "",
      image: null,
      tags: [],
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        content: "",
        image: null,
        title: "",
        tags: [],
      });
    }
  }, [form.formState.isSubmitSuccessful]);

  function handleCreateNewPost(data: any) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateNewPost)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Título da postagem"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap"
                >
                  <FormItem>
                    <FormControl>
                      <Tag value="paisagem" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <Tag value="viagem" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <Tag value="família" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <Tag value="férias" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <Tag value="jogos" />
                    </FormControl>
                  </FormItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Diga o que está pensando...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="image"
                  type="file"
                  placeholder="Selecione uma imagem"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="default" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
