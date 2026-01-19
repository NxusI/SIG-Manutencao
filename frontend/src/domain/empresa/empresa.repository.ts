import { apiClient } from "@/infraestructure/api/api-client";
import { IEmpresaRepository } from "./contracts/empresa-repository.interface";
import { Empresa } from "./entities/empresa.entity";
import { ICreateEmpresaParams } from "./params/create-empresa.params";

export class EmpresaRepository implements IEmpresaRepository {
  async create(data: ICreateEmpresaParams): Promise<Empresa> {
    const res = await apiClient.post(`empresa`, data);
    return res.data;
  }

  async getAll(): Promise<Empresa[]> {
    const res = await apiClient.get(`empresa`);
    return res.data;
  }

  async getById(id: number): Promise<Empresa> {
    const res = await apiClient.get(`empresa/${id}`);
    return res.data;
  }

  async update(
    id: number,
    data: Partial<ICreateEmpresaParams>,
  ): Promise<Empresa> {
    const res = await apiClient.patch(`empresa/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    const res = await apiClient.delete(`empresa/${id}`);
    return res.data;
  }
}
