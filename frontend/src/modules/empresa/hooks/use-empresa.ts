import { EmpresaService } from "@/domain/empresa/empresa.service";
import { Empresa } from "@/domain/empresa/entities/empresa.entity";
import { ICreateEmpresaParams } from "@/domain/empresa/params/create-empresa.params";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export const useGetAllEmpresa = () => {
  const [empresa, setEmpresa] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresa = useCallback(async () => {
    setLoading(true);
    const service = new EmpresaService();
    await service
      .getAll()
      .then((res) => {
        setEmpresa(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchEmpresa();
  }, [fetchEmpresa]);

  return {
    empresa,
    loading,
    error,
    refetch: fetchEmpresa,
  };
};

export const useGetEmpresaById = (id: number) => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresa = useCallback(async () => {
    setLoading(true);
    const service = new EmpresaService();
    await service
      .getById(id)
      .then((res) => {
        setEmpresa(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchEmpresa();
  }, [fetchEmpresa]);

  return {
    empresa,
    loading,
    error,
    refetch: fetchEmpresa,
  };
};

export const useCreateEmpresa = () => {
  const service = new EmpresaService();

  const mutation = useMutation({
    mutationFn: ({ data }: { data: ICreateEmpresaParams }) =>
      service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
  });

  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};

export const useUpdateEmpresa = () => {
  const service = new EmpresaService();

  const mutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ICreateEmpresaParams>;
    }) => service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};

export const useDeleteEmpresa = () => {
  const service = new EmpresaService();

  const mutation = useMutation({
    mutationFn: ({id}: {id: number}) => service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresas"] });
    },
  });

  return {
    delete: mutation.mutateAsync,
    loading: mutation.isPending,
  };
};
