import { ClienteService } from "@/domain/cliente/cliente.service";
import { Cliente } from "@/domain/cliente/entities/cliente.entity";
import { ICreateClienteParams } from "@/domain/cliente/params/create-cliente.params";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export function useGetAllCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const service = new ClienteService();

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    await service
      .getAll()
      .then((res) => {
        setClientes(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return {
    clientes,
    loading,
    error,
    refetch: fetchClientes,
  };
}

export function useCreateCliente() {
  const service = new ClienteService();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: ICreateClienteParams }) =>
      service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });

  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}

export function useUpdateCliente() {
  const service = new ClienteService();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ICreateClienteParams>;
    }) => service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}

export function useDeleteCliente() {
  const service = new ClienteService();

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });

  return {
    delete: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}
