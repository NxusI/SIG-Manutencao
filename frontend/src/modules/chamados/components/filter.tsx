import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { ListFilter, Plus, Search, X } from "lucide-react";
import CustomSelect from "@/shared/components/comon/select";
import { useGetStatus } from "../hooks/use-chamado";
import { useGetAllCliente } from "@/modules/cliente/hooks/use-cliente";
import { useGetAllUsuarios } from "@/modules/usuario/hooks/use-usuario";
import { OptionFormatted } from "@/shared/types/components.types";

type TipoFiltro = "responsavel" | "cliente" | "status" | "periodo";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onFilter: (
    dataInicio: string,
    dataFim: string,
    responsavel: number | undefined,
    cliente: number | undefined,
    status: number | undefined,
  ) => void;
}

export default function FilterChamados({ open, setOpen, onFilter }: Props) {
  const [tipoFiltro, setTipoFiltro] = useState<OptionFormatted | null>(null);
  const [filtroEmEdicao, setFiltroEmEdicao] = useState<TipoFiltro | null>(null);
  const [valorFiltro, setValorFiltro] = useState<OptionFormatted | null>(null);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [responsavel, setResponsavel] = useState<OptionFormatted | null>(null);
  const [cliente, setCliente] = useState<OptionFormatted | null>(null);
  const [status, setStatus] = useState<OptionFormatted | null>(null);
  const [filtrosAtivos, setFiltrosAtivos] = useState<TipoFiltro[]>([]);
  const [searchCliente, setSearchCliente] = useState("");
  const [searchResponsavel, setSearchResponsavel] = useState("");
  const [debouncedCliente, setDebouncedCliente] = useState("");
  const [debouncedResponsavel, setDebouncedResponsavel] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCliente(searchCliente);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchCliente]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedResponsavel(searchResponsavel);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchResponsavel]);

  const { status: statusList } = useGetStatus();

  const { clientes } = useGetAllCliente({
    limit: 100,
    page: 1,
    nome: debouncedCliente,
  });

  const { usuarios } = useGetAllUsuarios({
    limit: 100,
    page: 1,
    nome: debouncedResponsavel,
  });

  const opcoesFiltro = [
    { label: "Responsável", value: "responsavel" },
    { label: "Cliente", value: "cliente" },
    { label: "Status", value: "status" },
    { label: "Período de Solicitação", value: "periodo" },
  ].filter((f) => !filtrosAtivos.includes(f.value as TipoFiltro));

  function adicionarFiltro() {
    if (!filtroEmEdicao) return;
    if (filtroEmEdicao !== "periodo" && !valorFiltro) return;

    setFiltrosAtivos((prev) => [...prev, filtroEmEdicao]);

    if (filtroEmEdicao === "responsavel") setResponsavel(valorFiltro);
    if (filtroEmEdicao === "cliente") setCliente(valorFiltro);
    if (filtroEmEdicao === "status") setStatus(valorFiltro);

    setFiltroEmEdicao(null);
    setTipoFiltro(null);
    setValorFiltro(null);
  }

  function removerFiltro(tipo: TipoFiltro) {
    let novoResponsavel = responsavel;
    let novoCliente = cliente;
    let novoStatus = status;
    let novaDataInicio = dataInicio;
    let novaDataFim = dataFim;

    setFiltrosAtivos((prev) => prev.filter((f) => f !== tipo));

    if (tipo === "responsavel") {
      setResponsavel(null);
      novoResponsavel = null;
    }

    if (tipo === "cliente") {
      setCliente(null);
      novoCliente = null;
    }

    if (tipo === "status") {
      setStatus(null);
      novoStatus = null;
    }

    if (tipo === "periodo") {
      setDataInicio("");
      setDataFim("");
      novaDataInicio = "";
      novaDataFim = "";
    }

    onFilter(
      novaDataInicio,
      novaDataFim,
      novoResponsavel ? Number(novoResponsavel.value) : undefined,
      novoCliente ? Number(novoCliente.value) : undefined,
      novoStatus ? Number(novoStatus.value) : undefined,
    );
  }

  function getLabelFiltro(tipo: TipoFiltro) {
    if (tipo === "responsavel") return `responsavel: ${responsavel?.label}`;
    if (tipo === "cliente") return `cliente: ${cliente?.label}`;
    if (tipo === "status") return `status: ${status?.label}`;
    if (tipo === "periodo")
      return `periodo: ${dataInicio || "-"} até ${dataFim || "-"}`;
    return tipo;
  }

  function pesquisar() {
    onFilter(
      dataInicio,
      dataFim,
      responsavel ? Number(responsavel.value) : undefined,
      cliente ? Number(cliente.value) : undefined,
      status ? Number(status.value) : undefined,
    );

    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="hover:scale-105">
          <ListFilter /> Filtros
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-screen sm:w-[720px] space-y-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <CustomSelect
            label="Selecionar filtro"
            options={opcoesFiltro}
            value={tipoFiltro}
            onChange={(option: OptionFormatted | null) => {
              setTipoFiltro(option);
              setFiltroEmEdicao(option?.value as TipoFiltro);
            }}
            className="w-full"
          />

          {filtroEmEdicao === "responsavel" && (
            <CustomSelect
              className="w-full"
              label="Responsável"
              options={usuarios.map((u) => ({
                label: u.nome,
                value: String(u.idUsuario),
              }))}
              value={valorFiltro}
              onChange={setValorFiltro}
              onSearchInputChange={setSearchResponsavel}
            />
          )}

          {filtroEmEdicao === "cliente" && (
            <CustomSelect
              className="w-full"
              label="Cliente"
              options={clientes.map((c) => ({
                label: c.nome,
                value: String(c.idCliente),
              }))}
              value={valorFiltro}
              onChange={setValorFiltro}
              onSearchInputChange={setSearchCliente}
            />
          )}

          {filtroEmEdicao === "status" && (
            <CustomSelect
              className="w-full"
              label="Status"
              options={statusList.map((s) => ({
                label: s.descricao,
                value: String(s.idStatus),
              }))}
              value={valorFiltro}
              onChange={setValorFiltro}
            />
          )}

          {filtroEmEdicao === "periodo" && (
            <>
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />

              <Input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </>
          )}

          {filtroEmEdicao && (
            <Button size="icon" onClick={adicionarFiltro}>
              <Plus />
            </Button>
          )}
        </div>

        {filtrosAtivos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filtrosAtivos.map((filtro) => (
              <div
                key={filtro}
                className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md text-sm"
              >
                {getLabelFiltro(filtro)}
                <button onClick={() => removerFiltro(filtro)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={pesquisar} className="gap-2">
            <Search size={16} />
            Pesquisar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
