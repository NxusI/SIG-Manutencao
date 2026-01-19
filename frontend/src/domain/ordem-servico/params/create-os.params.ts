export interface ICreareOSParams {
  idChamado: number;
  obs: string;
  dataPrazo: string;
  maoDeObra: number;
  produtos: { nome: string; preco: number; quantidade: number }[];
}
