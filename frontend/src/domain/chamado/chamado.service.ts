import { PaginatedResponse } from "@/shared/types/paginated-request.types";
import { ChamadoRepository } from "./chamado.repository";
import { Chamado } from "./entities/chamado.entity";
import { ICreateChamadoParams } from "./params/create-chamado.params";
import { IGetAllChamadoParams } from "./params/get-all-chamado.params";
import { Status } from "./entities/status.entity";

export class ChamadoService {
  private readonly repository: ChamadoRepository;
  constructor() {
    this.repository = new ChamadoRepository();
  }

  async getAll(params?: IGetAllChamadoParams): Promise<PaginatedResponse<Chamado>> {
    return await this.repository.getAll(params);
  }

  async create(data: ICreateChamadoParams): Promise<Chamado> {
    return await this.repository.create(data);
  }

  async update(
    id: number,
    data: Partial<ICreateChamadoParams>
  ): Promise<Chamado> {
    return await this.repository.update(id, data);
  }

  async status(): Promise<Status[]> {
    return await this.repository.status();
  }
}
