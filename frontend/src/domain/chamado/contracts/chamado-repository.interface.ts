import { PaginatedResponse } from "@/shared/types/paginated-request.types";
import { Chamado } from "../entities/chamado.entity";
import { ICreateChamadoParams } from "../params/create-chamado.params";
import { IGetAllChamadoParams } from "../params/get-all-chamado.params";
import { Status } from "../entities/status.entity";

export interface IChamadoRepository {
  getAll(params?: IGetAllChamadoParams): Promise<PaginatedResponse<Chamado>>;
  create(data: ICreateChamadoParams): Promise<Chamado>;
  update(id: number, data: Partial<ICreateChamadoParams>): Promise<Chamado>;
  status(): Promise<Status[]>;
}
