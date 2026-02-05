import { Status } from "./status.entity";

export interface Chamado {
  idChamado: number;
  idUsuarioCriacao: number;
  idCliente: number;
  idResponsavel: number;
  titulo: string;
  descricao: string;
  idStatus: number;
  equipamento: string;
  dataSolicitacao: string;
  dataConfirmacao: string | null;
  dataFechamento: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  cliente: {
    nome: string;
    telefone: string;
  };
  status: Status;
  responsavel: {
    nome: string;
  };
  criadoPor: {
    nome: string;
  };
}
