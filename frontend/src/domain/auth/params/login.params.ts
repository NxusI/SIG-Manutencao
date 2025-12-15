export interface LoginParams {
  login: string;
  senha: string;
}

export enum TipoUsuario {
  GESTOR = "GESTOR",
  TECNICO = "TECNICO",
}
