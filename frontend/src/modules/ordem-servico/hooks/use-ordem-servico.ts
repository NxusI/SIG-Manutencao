import { OrdemServico } from "@/domain/ordem-servico/entities/ordem-servico.entity";
import { OrdemServicoService } from "@/domain/ordem-servico/ordem-servico.service";
import { ICreareOSParams } from "@/domain/ordem-servico/params/create-os.params";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export const useGetAllOrdemServico = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdens = useCallback(async () => {
    const service = new OrdemServicoService();

    setLoading(true);
    await service
      .getAll()
      .then((res) => {
        setOrdens(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchOrdens();
  }, [fetchOrdens]);

  return {
    ordens,
    loading,
    error,
    refetch: fetchOrdens,
  };
};

export const useGetOrdemById = (id: number) => {
  const [ordem, setOrdem] = useState<OrdemServico | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdem = useCallback(async () => {
    const service = new OrdemServicoService();

    setLoading(true);
    await service
      .getById(id)
      .then((res) => {
        setOrdem(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchOrdem();
  }, [fetchOrdem]);

  return {
    ordem,
    loading,
    error,
    refetch: fetchOrdem,
  };
};

export const useCreateOrdem = () => {
  const service = new OrdemServicoService();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: ICreareOSParams }) => service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordens"] });
    },
  });

  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};

export const useUpdateOrdem = () => {
  const service = new OrdemServicoService();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ICreareOSParams>;
    }) => service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordens"] });
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};

export const useFinalizarOrdem = () => {
  const service = new OrdemServicoService();

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => service.finalizar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordens"] });
    },
  });

  return {
    finalizar: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};

export const useResponderOrdem = () => {
  const service = new OrdemServicoService();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: "APROVADO" | "REPROVADO";
    }) => service.responder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordens"] });
    },
  });

  return {
    responder: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};
