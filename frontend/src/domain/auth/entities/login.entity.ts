import { TipoUsuario } from "../params/login.params";

export interface LoginResponse {
  message: string;
  token: string;
  usuario: {
    id: number;
    nome: string;
    tipo: TipoUsuario;
  };
}
