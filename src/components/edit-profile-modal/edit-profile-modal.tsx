"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EditProfileForm } from "./edit-profile-form";

export default function EditProfileModal() {
  return (
    <DialogContent className="border-muted">
      <DialogHeader>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogDescription>Altere suas informações</DialogDescription>
      </DialogHeader>
      <EditProfileForm />
    </DialogContent>
  );
}
