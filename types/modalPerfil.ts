import { Perfil } from "./users"

export interface AddPerfil {
    mode: "create" | "edit"
    perfil?: Perfil | null

    onSuccess: () => void
    onClose: () => void;
}

export interface FormData {
    nombrePerfil: string;
}

export interface DeletePerfil {
  perfil?: Perfil | null;
  onClose: () => void;
  onSuccess: () => void
  onError: (message: string) => void;
}