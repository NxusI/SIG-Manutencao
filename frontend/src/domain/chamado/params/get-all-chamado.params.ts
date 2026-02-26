import { IGetPaginatedParams } from "@/shared/types/paginated-request.types";

export interface IGetAllChamadoParams extends IGetPaginatedParams {
  idCliente?: number;
  idResponsavel?: number;
  idStatus?: number;
  dataInicio?: string;
  dataFim?: string;
  titulo?: string;
}
