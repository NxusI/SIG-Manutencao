import { IGetPaginatedParams } from "@/shared/types/paginated-request.types";

export interface IGetAllUsuarioParams extends IGetPaginatedParams {
  nome?: string;
  email?: string;
  tipo?: string;
  login?: string;
}
