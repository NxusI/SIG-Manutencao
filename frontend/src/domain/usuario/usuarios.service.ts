import {
  PaginatedResponse,
} from "@/shared/types/paginated-request.types";
import { UsuarioRepository } from "./usuario.repository";
import { Usuario } from "./entities/usuario.entity";
import { ICreateUsuarioParams } from "./params/create-usuario.params";
import { IGetAllUsuarioParams } from "./params/get-all-usuario.params";

export class UsuarioService {
  private readonly repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async getAll(
    params: IGetAllUsuarioParams
  ): Promise<PaginatedResponse<Usuario>> {
    return await this.repository.getAll(params);
  }

  async create(data: ICreateUsuarioParams): Promise<Usuario> {
    return await this.repository.create(data);
  }

  async update(
    id: number,
    data: Partial<ICreateUsuarioParams>
  ): Promise<Usuario> {
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
