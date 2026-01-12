import { IGetPaginatedParams } from "@/shared/types/paginated-request.types";

export interface IGetAllChamadoParams extends IGetPaginatedParams {
  clienteId?: number;
  tecnicoId?: number;
  statusId?: number;
  dataInicio?: string;
  dataFim?: string;
}
