import {
  IGetPaginatedParams,
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";
import { OrdemServico } from "../entities/ordem-servico.entity";
import { ICreareOSParams } from "../params/create-os.params";

export interface IOrdemServicoRepository {
  create(data: ICreareOSParams): Promise<OrdemServico>;
  getAll(params: IGetPaginatedParams): Promise<PaginatedResponse<OrdemServico>>;
  getById(id: number): Promise<OrdemServico>;
  update(id: number, data: Partial<ICreareOSParams>): Promise<OrdemServico>;
  finalizar(id: number): Promise<void>;
  responder(
    id: number,
    resposta: "APROVADO" | "REPROVADO",
  ): Promise<OrdemServico>;
  pagamento(id: number): Promise<void>;
  garantia(id: number, garantia: string): Promise<void>;
}
