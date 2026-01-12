import { IGetPaginatedParams, PaginatedResponse } from "@/shared/types/paginated-request.types";
import { Chamado } from "../entities/chamado.entity";
import { ICreateChamadoParams } from "../params/create-chamado.params";

export interface IChamadoRepository {
  getAll(params?: IGetPaginatedParams): Promise<PaginatedResponse<Chamado>>;
  create(data: ICreateChamadoParams): Promise<Chamado>;
  update(id: number, data: Partial<ICreateChamadoParams>): Promise<Chamado>;
}
