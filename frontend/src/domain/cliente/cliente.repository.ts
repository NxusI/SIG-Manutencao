import { apiClient } from "@/infraestructure/api/api-client";
import { IClienteRepository } from "./contracts/cliente-repository.interface";
import { Cliente } from "./entities/cliente.entity";
import { ICreateClienteParams } from "./params/create-cliente.params";
import { IGetAllClienteParams } from "./params/get-all-cliente.params";
import { PaginatedResponse } from "@/shared/types/paginated-request.types";

export class ClienteRepository implements IClienteRepository {
  async getAll(
    params: IGetAllClienteParams,
  ): Promise<PaginatedResponse<Cliente>> {
    const res = await apiClient.get(`cliente`, {
      params,
    });
    return res.data;
  }

  async create(data: ICreateClienteParams): Promise<Cliente> {
    const res = await apiClient.post(`cliente/cadastro`, data);
    return res.data;
  }

  async update(
    id: number,
    data: Partial<ICreateClienteParams>,
  ): Promise<Cliente> {
    const res = await apiClient.patch(`cliente/editar-cliente/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    const res = await apiClient.delete(`cliente/excluir-cliente/${id}`);
    return res.data;
  }
}
