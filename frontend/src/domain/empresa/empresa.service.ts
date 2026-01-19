import { EmpresaRepository } from "./empresa.repository";
import { Empresa } from "./entities/empresa.entity";
import { ICreateEmpresaParams } from "./params/create-empresa.params";

export class EmpresaService {
  private readonly repository: EmpresaRepository;

  constructor() {
    this.repository = new EmpresaRepository();
  }

  getAll(): Promise<Empresa[]> {
    return this.repository.getAll();
  }

  create(data: ICreateEmpresaParams): Promise<Empresa> {
    return this.repository.create(data);
  }

  update(id: number, data: Partial<ICreateEmpresaParams>): Promise<Empresa> {
    return this.repository.update(id, data);
  }

  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  getById(id: number): Promise<Empresa> {
    return this.repository.getById(id);
  }
}
