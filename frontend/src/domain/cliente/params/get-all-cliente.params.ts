import { IGetPaginatedParams } from "@/shared/types/paginated-request.types";

export interface IGetAllClienteParams extends IGetPaginatedParams {
  nome?: string;
  email?: string;
  telefone?: string;
}
