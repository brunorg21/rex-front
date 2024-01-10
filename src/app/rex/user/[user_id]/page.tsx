import EditProfileModal from "@/components/edit-profile-modal/edit-profile-modal";
import { Post } from "@/components/post";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { UserIcon } from "lucide-react";

export default function User() {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-center">
        <UserAvatar size="lg" />
      </div>
      <Separator />

      <div className="flex justify-between">
        <div className="flex flex-col space-y-2">
          <span>Bruno Rafael</span>
          <span className="text-muted-foreground">@bruno</span>

          <p>Programador Web 😍</p>

          <div className="flex space-x-4">
            <span className="flex gap-2">
              <UserIcon /> 20 seguidores
            </span>
            <span className="flex gap-2">
              <UserIcon /> 20 seguindo
            </span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-4 text-md" variant="outline">
              Editar Perfil
            </Button>
          </DialogTrigger>
          <EditProfileModal />
        </Dialog>
      </div>

      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
