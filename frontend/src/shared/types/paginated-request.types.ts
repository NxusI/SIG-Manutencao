export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    lastPage: number;
  };
}

export interface IGetPaginatedParams{
  page?: number;
  limit?: number;
}