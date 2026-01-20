import {
  IGetPaginatedParams,
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";
import { IUsuarioRepository } from "./contracts/usuario-repository.interface";
import { Usuario } from "./entities/usuario.entity";
import { apiClient } from "@/infraestructure/api/api-client";
import { ICreateUsuarioParams } from "./params/create-usuario.params";

export class UsuarioRepository implements IUsuarioRepository {
  async getAll(
    params: IGetPaginatedParams
  ): Promise<PaginatedResponse<Usuario>> {
    const res = await apiClient.get(`auth/users`, {
      params,
    });
    return res.data;
  }

  async create(data: ICreateUsuarioParams): Promise<Usuario> {
    const res = await apiClient.post(`auth/cadastro`, data);
    return res.data;
  }

  async update(
    id: number,
    data: Partial<ICreateUsuarioParams>
  ): Promise<Usuario> {
    const res = await apiClient.patch(`auth/editar-user/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    const res = await apiClient.delete(`auth/remover-user/${id}`);
    return res.data;
  }
}
