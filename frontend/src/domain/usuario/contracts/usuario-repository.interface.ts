import {
  IGetPaginatedParams,
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";
import { Usuario } from "../entities/usuario.entity";
import { ICreateUsuarioParams } from "../params/create-usuario.params";

export interface IUsuarioRepository {
  getAll(params: IGetPaginatedParams): Promise<PaginatedResponse<Usuario>>;
  create(data: ICreateUsuarioParams): Promise<Usuario>;
  update(id: number, data: Partial<ICreateUsuarioParams>): Promise<Usuario>;
  delete(id: number): Promise<void>;
}
