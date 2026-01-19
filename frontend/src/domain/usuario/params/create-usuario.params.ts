import { TipoUsuario } from "../entities/usuario.entity";

export interface ICreateUsuarioParams {
  nome: string;
  login: string;
  email: string;
  senha: string;
  idEmpresa: number;
  tipo: TipoUsuario;
}
