import { Empresa } from "../entities/empresa.entity";
import { ICreateEmpresaParams } from "../params/create-empresa.params";

export interface IEmpresaRepository {
  create(data: ICreateEmpresaParams): Promise<Empresa>;
  getAll(): Promise<Empresa[]>;
  getById(id: number): Promise<Empresa>;
  update(id: number, data: Partial<ICreateEmpresaParams>): Promise<Empresa>;
  delete(id: number): Promise<void>;
}
