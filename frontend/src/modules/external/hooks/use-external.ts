import { CEP } from "@/domain/external/entities/cep.entity";
import { ExternalService } from "@/domain/external/external.service";
import { useCallback, useEffect, useState } from "react";

export const useGetCep = (cepString: string) => {
  const [cep, setCep] = useState<CEP | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCEP = useCallback(async () => {
    const service = new ExternalService();
    setLoading(true);

    await service
      .getCep(cepString)
      .then((res) => {
        setCep(res);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cepString]);

  useEffect(() => {
    fetchCEP();
  }, [fetchCEP]);

  return {
    cep,
    loading,
    error,
    refetch: fetchCEP,
  };
};
