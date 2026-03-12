import { Empresa } from "@/domain/empresa/entities/empresa.entity";

export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
  createdAt: string;
  idEmpresa: number;
  tipo: TipoUsuario;
  empresa: Empresa;
}

export enum TipoUsuario {
  TECNICO = "TECNICO",
  GESTOR = "GESTOR",
}
