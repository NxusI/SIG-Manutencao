import { ChamadoService } from "@/domain/chamado/chamado.service";
import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { ICreateChamadoParams } from "@/domain/chamado/params/create-chamado.params";
import { IGetAllChamadoParams } from "@/domain/chamado/params/get-all-chamado.params";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Column } from "../types/chamados.types";
import { STATUS_COLUMNS } from "../data/status";
import { Status } from "@/domain/chamado/entities/status.entity";

export function useGetAllChamados(params?: IGetAllChamadoParams) {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const service = new ChamadoService();

  const fetchChamados = useCallback(async () => {
    setLoading(true);
    await service
      .getAll(params)
      .then((res) => {
        setChamados(res.data);
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
    fetchChamados();
  }, [fetchChamados]);

  return {
    chamados,
    loading,
    error,
    total,
    refetch: fetchChamados,
  };
}

export function useKanbanChamados(params?: IGetAllChamadoParams) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(false);

  const service = new ChamadoService();

  const load = async () => {
    setLoading(true);

    const data = await Promise.all(
      STATUS_COLUMNS.map(async (status) => {
        if (params?.idStatus && params.idStatus !== status.id) {
          return {
            ...status,
            cards: [],
          };
        }

        const response = await service.getAll({
          ...params,
          idStatus: status.id,
        });

        return {
          ...status,
          cards: response.data,
        };
      }),
    );

    setColumns(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [params]);

  return {
    columns,
    loading,
    refetch: load,
  };
}

export function useCreateChamado() {
  const service = new ChamadoService();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: ICreateChamadoParams }) =>
      service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
    },
  });

  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}

export function useUpateChamado() {
  const service = new ChamadoService();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ICreateChamadoParams>;
    }) => service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}

export const useGetStatus = () => {
  const [status, setstatus] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const service = new ChamadoService();

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    await service
      .status()
      .then((res) => {
        setstatus(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    loading,
    error,
    refetch: fetchStatus,
  };
};
