"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { CreateFormModal } from "./create-form-modal";

export default function CreatePostModal() {
  return (
    <DialogContent className="border-muted">
      <DialogHeader>
        <DialogTitle>Nova publicação</DialogTitle>
        <DialogDescription>Como está sendo seu dia hoje?</DialogDescription>
      </DialogHeader>
      <CreateFormModal />
    </DialogContent>
  );
}
