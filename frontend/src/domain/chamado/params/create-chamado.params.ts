export interface ICreateChamadoParams {
  idCliente: number;
  titulo: string;
  idResponsavel: number | null;
  equipamento: string;
  descricao: string;
  idStatus?: number;
}
