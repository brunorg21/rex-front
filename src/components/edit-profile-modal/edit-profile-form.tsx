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
import { UserData } from "@/models/user-model";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios-client";
import { toast } from "sonner";

const editProfileFormSchema = z.object({
  name: z.string().max(40, {
    message: "Nome precisa conter no máximo 40 caracteres",
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

interface EditProfileFormlProps {
  currentUser: UserData | null;
}

export function EditProfileForm({ currentUser }: EditProfileFormlProps) {
  const [file, setFile] = useState<any>("");

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (profile: EditProfileFormData) => {
      const formData = new FormData();

      formData.append("avatarUrl", profile.image[0]);
      formData.append("name", profile.name);
      formData.append("username", profile.username);
      formData.append("bio", profile.bio);

      return await api.put("/user", formData);
    },
    onSuccess: () => {
      toast.success("Usuário atualizado");
    },
  });
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      bio: currentUser?.bio ?? "",
      image: currentUser?.avatar_url,
      name: currentUser?.name,
      username: currentUser?.username,
    },
  });

  const fileToDataUri = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  async function handleEditProfile(data: EditProfileFormData) {
    await updateProfile(data);
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
