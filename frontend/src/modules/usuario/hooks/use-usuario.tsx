import { Usuario } from "@/domain/usuario/entities/usuario.entity";
import { UsuarioService } from "@/domain/usuario/usuarios.service";
import { IGetPaginatedParams } from "@/shared/types/paginated-request.types";
import { useCallback, useEffect, useState } from "react";

export function useGetAllUsuarios(params: IGetPaginatedParams) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const service = new UsuarioService();

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);

    await service
      .getAll(params)
      .then((res) => {
        setUsuarios(res.data);
        setTotal(res.meta.totalPages);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return {
    usuarios,
    loading,
    error,
    total,
    refetch: fetchUsuarios,
  };
}
