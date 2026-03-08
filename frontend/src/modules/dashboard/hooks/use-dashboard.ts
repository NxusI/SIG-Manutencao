import { DashboardService } from "@/domain/dashboard/dashboard.service";
import { AreaChart } from "@/domain/dashboard/entities/area-chart.entity";
import { BarChart } from "@/domain/dashboard/entities/bar-chart.entity";
import { Cards } from "@/domain/dashboard/entities/cards.entity";
import { PieChart } from "@/domain/dashboard/entities/pie-chart";
import { IDashboardParams } from "@/domain/dashboard/params/dashboard-params.params";
import { useCallback, useEffect, useState } from "react";

export function usePieChart(params: IDashboardParams) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pieData, setPieData] = useState<PieChart[]>([]);

  const service = new DashboardService();
  const fetchPieData = useCallback(async () => {
    setLoading(true);
    await service
      .pieChart(params)
      .then((res) => {
        setPieData(res);
      })
      .catch((err) => {
        setError(err.response.data.message || "Ocorreu uma inconsistência ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchPieData();
  }, [fetchPieData]);

  return {
    pieData,
    loading,
    error,
    refetch: fetchPieData,
  };
}

export function useAreaChart(params: IDashboardParams) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [areaData, setAreaData] = useState<AreaChart[]>([]);

  const service = new DashboardService();
  const fetchAreaData = useCallback(async () => {
    setLoading(true);
    await service
      .areaChart(params)
      .then((res) => {
        setAreaData(res);
      })
      .catch((err) => {
        setError(err.response.data.message || "Ocorreu uma inconsistência ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchAreaData();
  }, [fetchAreaData]);

  return {
    areaData,
    loading,
    error,
    refetch: fetchAreaData,
  };
}

export function useBarChart(params: IDashboardParams) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [barData, setBarData] = useState<BarChart[]>([]);

  const service = new DashboardService();
  const fetchBarData = useCallback(async () => {
    setLoading(true);
    await service
      .barChart(params)
      .then((res) => {
        setBarData(res);
      })
      .catch((err) => {
        setError(err.response.data.message || "Ocorreu uma inconsistência ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchBarData();
  }, [fetchBarData]);

  return {
    barData,
    loading,
    error,
    refetch: fetchBarData,
  };
}

export function useGetCards(params: IDashboardParams) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Cards | null>(null);

  const service = new DashboardService();
  const fetchCards = useCallback(async () => {
    setLoading(true);
    await service
      .getCards(params)
      .then((res) => {
        setCards(res);
        console.log("lero",res)
      })
      .catch((err) => {
        setError(err.response.data.message || "Ocorreu uma inconsistência ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards,
  };
}
