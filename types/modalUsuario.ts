import { User } from "./users";

export interface AddUser {
    mode: "create" | "edit"
    usuario?: User | null

    onSuccess: () => void
    onClose: () => void;
}

export interface DeleteUsuario {
  usuario?: User | null;
  onClose: () => void;
  onSuccess: () => void
  onError: (message: string) => void;
}