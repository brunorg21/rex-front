"use client";

import { UserData } from "@/models/user-model";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EditProfileForm } from "./edit-profile-form";

interface EditProfileModalProps {
  currentUser: UserData | null;
}

export default function EditProfileModal({
  currentUser,
}: EditProfileModalProps) {
  return (
    <DialogContent className="border-muted">
      <DialogHeader>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogDescription>Altere suas informações</DialogDescription>
      </DialogHeader>
      <EditProfileForm currentUser={currentUser} />
    </DialogContent>
  );
}
