import {
  IGetPaginatedParams,
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";
import { IUsuarioRepository } from "./contracts/usuario-repository.interface";
import { Usuario } from "./entities/usuario.entity";
import { apiClient } from "@/infraestructure/api/api-client";
import { ICreateUsuarioParams } from "./params/create-usuario.params";
import { IGetAllUsuarioParams } from "./params/get-all-usuario.params";

export class UsuarioRepository implements IUsuarioRepository {
  async getAll(
    params: IGetAllUsuarioParams,
  ): Promise<PaginatedResponse<Usuario>> {
    const res = await apiClient.get(`auth/usuarios`, {
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
    data: Partial<ICreateUsuarioParams>,
  ): Promise<Usuario> {
    const res = await apiClient.patch(`auth/editar-usuario/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    const res = await apiClient.delete(`auth/remover-usuario/${id}`);
    return res.data;
  }
}
