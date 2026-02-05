export interface ICreareOSParams {
  idChamado: number;
  obs: string;
  dataPrazo: Date;
  maoDeObra: number;
  produtos: { nome: string; preco: number; quantidade: number }[];
}
