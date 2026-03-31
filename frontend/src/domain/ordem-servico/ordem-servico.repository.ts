import { apiClient } from "@/infraestructure/api/api-client";
import { IOrdemServicoRepository } from "./contracts/ordem-servico-repository.interface";
import { OrdemServico } from "./entities/ordem-servico.entity";
import { ICreareOSParams } from "./params/create-os.params";
import {
  IGetPaginatedParams,
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";

export class OrdemServicoRepository implements IOrdemServicoRepository {
  async create(data: ICreareOSParams): Promise<OrdemServico> {
    const res = await apiClient.post(`os/gerar`, data);
    return res.data;
  }

  async getAll(
    params: IGetPaginatedParams,
  ): Promise<PaginatedResponse<OrdemServico>> {
    const res = await apiClient.get(`os`, {
      params,
    });
    return res.data;
  }

  async getById(id: number): Promise<OrdemServico> {
    const res = await apiClient.get(`os/${id}`);
    return res.data;
  }

  async update(
    id: number,
    data: Partial<ICreareOSParams>,
  ): Promise<OrdemServico> {
    const res = await apiClient.patch(`os/${id}`, data);
    return res.data;
  }

  async finalizar(id: number): Promise<void> {
    const res = await apiClient.patch(`os/finalizar/${id}`);
    return res.data;
  }

  async responder(
    id: number,
    resposta: "APROVADO" | "REPROVADO",
  ): Promise<OrdemServico> {
    const res = await apiClient.get(`os/responder/${id}/${resposta}`);
    return res.data;
  }

  async pagamento(id: number): Promise<void> {
    const res = await apiClient.post(`os/${id}/pagamento`, {});
    return res.data;
  }

  async garantia(id: number, garantia: string): Promise<void> {
    const res = await apiClient.post(`os/${id}/garantia`,{
      prazoGarantiaDias: garantia
    });
    return res.data
  }
}
