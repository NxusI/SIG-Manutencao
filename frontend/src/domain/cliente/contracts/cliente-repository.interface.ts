import { Cliente } from "../entities/cliente.entity";
import { ICreateClienteParams } from "../params/create-cliente.params";

export interface IClienteRepository {
  getAll(): Promise<Cliente[]>;
  create(data: ICreateClienteParams): Promise<Cliente>;
  update(id: number, data: Partial<ICreateClienteParams>): Promise<Cliente>;
  delete(id: number): Promise<void>;
}
