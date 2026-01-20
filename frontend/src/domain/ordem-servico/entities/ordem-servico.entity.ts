import { Chamado } from "@/domain/chamado/entities/chamado.entity";

export interface OrdemServico {
  idOS: number;
  idChamado: number;
  obs: string;
  dataPrazo: string;
  valor: number;
  createdAt: string;
  updatedAt: string;
  chamado: Chamado;
  itens: Produto[];
}

export interface Produto {
  idOsProduto: number;
  idOS: number;
  idProduto: number;
  quantidade: number;
  produto: {
    idProduto: number;
    descricao: string;
    preco: number;
    createdAt: string;
    updatedAt: string;
  };
}
