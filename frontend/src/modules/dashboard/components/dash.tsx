import { useMemo, useState } from "react";
import { ChartAreaInteractive } from "./area-chart";
import CardsDash from "./cards";
import { ChartPieStatus } from "./pie-chart";
import SearchDash from "./search-filter";
import { OptionFormatted } from "@/shared/types/components.types";
import { useAreaChart, useBarChart, useGetCards, usePieChart } from "../hooks/use-dashboard";
import { ChartBarTecnicos } from "./bar-chart";
import { formatDateToYMD } from "@/utils/formatters";

const hoje = new Date();
const trintaDiasAtras = new Date();
trintaDiasAtras.setDate(hoje.getDate() - 30);

const Dash = () => {
  const [inicio, setInicio] = useState<string>(
    formatDateToYMD(trintaDiasAtras),
  );
  const [fim, setFim] = useState<string>(formatDateToYMD(hoje));
  const [status, setStatus] = useState<OptionFormatted | null>(null);
  const [tecnico, setTecnico] = useState<OptionFormatted | null>(null);

  const params = useMemo(() => {
    return {
      dataInicio: inicio,
      dataFim: fim,
      ...(status ? { idStatus: Number(status.value) } : {}),
      ...(tecnico ? { idResponsavel: Number(tecnico.value) } : {}),
    };
  }, [inicio, fim, status, tecnico]);

  const { barData, error: barError, loading: barLoading } = useBarChart(params);
  const { pieData, error: pieError, loading: pieLoading } = usePieChart(params);
  const { cards, error, loading } = useGetCards(params);
  const {
    areaData,
    loading: areaLoading,
    error: areaError,
  } = useAreaChart(params);

  const onFilter = (
    inicio: string,
    fim: string,
    status: OptionFormatted | null,
    tecnico: OptionFormatted | null,
  ) => {
    setInicio(inicio);
    setFim(fim);
    setStatus(status);
    setTecnico(tecnico);
  };

  return (
    <div className="grid gap-5">
      <SearchDash onFilter={onFilter} />
      <CardsDash data={cards} loading={loading} error={error} />
      <ChartAreaInteractive
        data={areaData}
        error={areaError}
        loading={areaLoading}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <ChartPieStatus data={pieData} error={pieError} loading={pieLoading} />
        <ChartBarTecnicos
          data={barData}
          error={barError}
          loading={barLoading}
        />
      </div>
    </div>
  );
};

export default Dash;
