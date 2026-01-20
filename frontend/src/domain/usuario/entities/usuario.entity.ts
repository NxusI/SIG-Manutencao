export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
  createdAt: string;
  idEmpresa: number;
  tipo: TipoUsuario;
}

export enum TipoUsuario {
  TECNICO = "TECNICO",
  GESTOR = "GESTOR",
}
