import { useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const tagFormSchema = z.object({
  tag: z.string(),
});

type TagFormData = z.infer<typeof tagFormSchema>;

export function TagForm() {
  const form = useForm<TagFormData>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag: "",
    },
  });

  function handleCreateNewTag(data: TagFormData) {
    console.log("tagData =>", data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleCreateNewTag)}
      className="flex gap-4"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <>
              <FormItem className="w-[90%]">
                <FormControl>
                  <Input placeholder="Nome da tag" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </Form>
      <Button type="submit" size="icon" variant="outline">
        <Plus />
      </Button>
    </form>
  );
}
