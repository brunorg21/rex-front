"use client";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editProfileFormSchema = z.object({
  name: z.string().max(12, {
    message: "Nome precisa conter no máximo 12 caracteres",
  }),
  username: z.string().max(12, {
    message: "Usuário precisa conter no máximo 12 caracteres",
  }),
  bio: z.string().max(240, {
    message: "Bio precisar conter no máximo 240 caracteres",
  }),
  image: z.any(),
});

type EditProfileFormData = z.infer<typeof editProfileFormSchema>;

export function EditProfileForm() {
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      bio: "",
      image: null,
      name: "",
      username: "",
    },
  });

  const [file, setFile] = useState<any>("");

  const fileToDataUri = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  async function handleEditProfile(data: any) {
    console.log(data);
  }

  function handleChangeImage(file: File) {
    if (file) {
      fileToDataUri(file).then((dataUri) => {
        setFile(dataUri);
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEditProfile)}
        className="flex flex-col gap-2 w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="resize-none"
                  placeholder="Usuário"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Bio"
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
              <FormLabel
                className="flex justify-center hover:bg-muted cursor-pointer border  border-dashed rounded-sm w-full relative"
                htmlFor="image"
              >
                {file ? (
                  <img
                    src={file}
                    alt=""
                    className="w-full h-[200px] object-cover"
                  />
                ) : (
                  <div className="p-3">Selecione uma imagem</div>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  id="image"
                  type="file"
                  placeholder="Foto de Perfil"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    if (e.target.files) {
                      handleChangeImage(e.target.files[0]);
                    }
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
