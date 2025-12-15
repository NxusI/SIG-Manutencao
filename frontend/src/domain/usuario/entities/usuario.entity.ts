export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
  createdAt: string;
}

export enum TipoUsuario {
  TECNICO = "TECNICO",
  GESTOR = "GESTOR",
}
