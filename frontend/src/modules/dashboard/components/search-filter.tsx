import { useGetStatus } from "@/modules/chamados/hooks/use-chamado";
import DatePicker from "@/shared/components/comon/date-picker";
import CustomSelect from "@/shared/components/comon/select";
import { Button } from "@/shared/components/ui/button";
import { OptionFormatted } from "@/shared/types/components.types";
import { formatDateToYMD } from "@/utils/formatters";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface Props {
  onFilter: (
    inicio: string,
    fim: string,
    status: OptionFormatted | null,
    tecnico: OptionFormatted | null,
  ) => void;
}

const hoje = new Date();
const trintaDiasAtras = new Date();
trintaDiasAtras.setDate(hoje.getDate() - 30);

const SearchDash = ({ onFilter }: Props) => {
  const [inicio, setInicio] = useState<Date | undefined>(trintaDiasAtras);
  const [fim, setFim] = useState<Date | undefined>(hoje);
  const [status, setStatus] = useState<OptionFormatted | null>(null);
  const [tecnico, setTecnico] = useState<OptionFormatted | null>(null);

  const { loading: loadingStatus, status: statusOptions } = useGetStatus();

  const handleInicio = (date: Date | undefined | string) => {
    setInicio(date as Date);
  };

  const handleFim = (date: Date | undefined | string) => {
    setFim(date as Date);
  };

  const handleSubmit = () => {
    onFilter(formatDateToYMD(inicio), formatDateToYMD(fim), status, tecnico);
  };

  const handleClear = () => {
    setInicio(trintaDiasAtras);
    setFim(hoje);
    setStatus(null);
    setTecnico(null);
    onFilter(
      formatDateToYMD(trintaDiasAtras),
      formatDateToYMD(hoje),
      null,
      null,
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <DatePicker
        value={inicio}
        onChange={handleInicio}
        label="Selecione um período inicial"
      />
      <DatePicker
        value={fim}
        onChange={handleFim}
        label="Selecione um peíodo final"
      />
      <CustomSelect
        label="Selecione um Status"
        onChange={setStatus}
        options={statusOptions.map((s) => ({
          label: s.descricao,
          value: String(s.idStatus),
        }))}
        value={status}
        className="w-full"
        loading={loadingStatus}
      />
      <CustomSelect
        label="Selecione um Técnico"
        onChange={setTecnico}
        options={[]}
        value={tecnico}
        className="w-full"
      />
      <Button onClick={handleSubmit}>
        <Search />
      </Button>
      <Button onClick={handleClear} variant={"secondary"}>
        <X />
      </Button>
    </div>
  );
};

export default SearchDash;
