import { PaginatedResponse } from "@/shared/types/paginated-request.types";
import { Cliente } from "../entities/cliente.entity";
import { ICreateClienteParams } from "../params/create-cliente.params";
import { IGetAllClienteParams } from "../params/get-all-cliente.params";

export interface IClienteRepository {
  getAll(params?: IGetAllClienteParams): Promise<PaginatedResponse<Cliente>>;
  create(data: ICreateClienteParams): Promise<Cliente>;
  update(id: number, data: Partial<ICreateClienteParams>): Promise<Cliente>;
  delete(id: number): Promise<void>;
}
