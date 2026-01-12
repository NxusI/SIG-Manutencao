import { Cliente } from "@/domain/cliente/entities/cliente.entity";
import { Status } from "./status.entuty";
import { Usuario } from "@/domain/usuario/entities/usuario.entity";

export interface Chamado {
  idChamado: number;
  idCliente: number;
  idResponsavel: number | null;
  dataChamado: string;
  descricao: string;
  idStatus: number;
  equipamento: string;
  cliente: Cliente;
  status: Status;
  responsavel: Usuario | null;
}
