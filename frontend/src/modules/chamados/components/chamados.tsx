import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { LayoutGrid, Plus, Table } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TableChamados from "./table-chamados";
import KanbanChamados from "./kanban-chamados";
import BaseModal from "@/shared/components/comon/base-modal";
import CreateChamado from "./create-form";
import { useGetAllChamados, useKanbanChamados } from "../hooks/use-chamado";
import FilterChamados from "./filter";

const Chamados = () => {
  const [page, setPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [open, setOpen] = useState<boolean>(false);
  const [searchTitulo, setSearchTitulo] = useState("");
  const [debouncedTitulo, setDebouncedTitulo] = useState("");

  const [inicio, setInicio] = useState<string>("");
  const [fim, setFim] = useState<string>("");
  const [responsavel, setResponsavel] = useState<number | undefined>(undefined);
  const [cliente, setCliente] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitulo(searchTitulo);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTitulo]);

  const params = useMemo(() => {
    return {
      page,
      titulo: debouncedTitulo,
      dataInicio: inicio,
      dataFim: fim,
      idResponsavel: responsavel,
      idCliente: cliente,
      idStatus: status,
    };
  }, [page, debouncedTitulo, inicio, fim, responsavel, cliente, status]);

  const { chamados, error, loading, total, refetch } = useGetAllChamados({
    ...params,
    limit: 7,
  });
  const {
    columns,
    loading: kanbanLoading,
    refetch: refetchKanban,
  } = useKanbanChamados({
    ...params,
    limit: 25,
  });

  const handleFilter = (
    dataInicio: string,
    dataFim: string,
    responsavel: number | undefined,
    cliente: number | undefined,
    status: number | undefined,
  ) => {
    setInicio(dataInicio);
    setFim(dataFim);
    setResponsavel(responsavel);
    setCliente(cliente);
    setStatus(status);
    setPage(1);
  };

  return (
    <div className="grid gap-5">
      <div className="flex justify-between gap-3">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setViewMode("table")}
            className={`hover:scale-105 ${
              viewMode === "table" ? "bg-primary text-white" : ""
            }`}
          >
            <Table />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setViewMode("grid")}
            className={`hover:scale-105 ${
              viewMode === "grid" ? "bg-primary text-white" : ""
            }`}
          >
            <LayoutGrid />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row justify-end gap-2">
          <FilterChamados
            onFilter={handleFilter}
            open={open}
            setOpen={setOpen}
          />
          <Input
            placeholder="Pesquisar Chamado..."
            className="lg:max-w-[350px]"
            value={searchTitulo}
            onChange={(e) => setSearchTitulo(e.target.value)}
          />
          <BaseModal
            size="xl"
            title="Adicionar Chamado"
            trigger={
              <Button>
                <Plus /> Adicionar
              </Button>
            }
            description="Preencha as informações abaixo para criar um novo chamado"
          >
            <CreateChamado
              refetch={() => {
                refetch();
                refetchKanban();
              }}
            />
          </BaseModal>
        </div>
      </div>
      {viewMode === "table" ? (
        <TableChamados
          refetch={() => {
            refetch();
            refetchKanban();
          }}
          chamados={chamados}
          error={error}
          loading={loading}
          page={page}
          setPage={setPage}
          total={total}
        />
      ) : (
        <KanbanChamados
          refetch={() => {
            refetch();
            refetchKanban();
          }}
          loading={kanbanLoading}
          columns={columns}
        />
      )}
    </div>
  );
};

export default Chamados;
