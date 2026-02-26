import { PaginatedResponse } from "@/shared/types/paginated-request.types";
import { IChamadoRepository } from "./contracts/chamado-repository.interface";
import { Chamado } from "./entities/chamado.entity";
import { apiClient } from "@/infraestructure/api/api-client";
import { ICreateChamadoParams } from "./params/create-chamado.params";
import { IGetAllChamadoParams } from "./params/get-all-chamado.params";
import { Status } from "./entities/status.entity";

export class ChamadoRepository implements IChamadoRepository {
  async getAll(params?: IGetAllChamadoParams): Promise<PaginatedResponse<Chamado>> {
    const res = await apiClient.get(`chamado`,{
      params
    });
    return res.data;
  }

  async create(data: ICreateChamadoParams): Promise<Chamado> {
    const res = await apiClient.post(`chamado/criar`, data);
    return res.data;
  }

  async update(
    id: number,
    data: Partial<ICreateChamadoParams>
  ): Promise<Chamado> {
    const res = await apiClient.patch(`chamado/editar-chamado/${id}`, data);
    return res.data;
  }

  async status(): Promise<Status[]> {
    const res = await apiClient.get(`chamado/listar-status`);
    return res.data;
  }
}
