import { Usuario } from "@/domain/usuario/entities/usuario.entity";
import { ICreateUsuarioParams } from "@/domain/usuario/params/create-usuario.params";
import { IGetAllUsuarioParams } from "@/domain/usuario/params/get-all-usuario.params";
import { UsuarioService } from "@/domain/usuario/usuarios.service";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export function useGetAllUsuarios(params: IGetAllUsuarioParams) {
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

export function useCreateUsuario() {
  const service = new UsuarioService();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: ICreateUsuarioParams }) =>
      service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}

export function useUpdateUsuario() {
  const service = new UsuarioService();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ICreateUsuarioParams>;
    }) => service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}

export function useDeleteUsuario() {
  const service = new UsuarioService();

  const mutation = useMutation({
    mutationFn: (id: number) => service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return {
    delete: mutation.mutateAsync,
    loading: mutation.isPending,
  };
} 
