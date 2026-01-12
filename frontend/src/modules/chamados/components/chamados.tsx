import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { LayoutGrid, Plus, Table } from "lucide-react";
import { useState } from "react";
import TableChamados from "./table-chamados";
import KanbanChamados from "./kanban-chamados";
import BaseModal from "@/shared/components/comon/base-modal";
import CreateChamado from "./create-form";
import { useGetAllChamados } from "../hooks/use-chamado";

const Chamados = () => {
  const [page, setPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const { chamados, error, loading, total, refetch } = useGetAllChamados({
    limit: 7,
    page,
  });

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3">
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
          <Input
            placeholder="Pesquisar Chamado..."
            className="lg:max-w-[350px]"
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
            <CreateChamado refetch={refetch} />
          </BaseModal>
        </div>
      </div>
      {viewMode === "table" ? (
        <TableChamados
          chamados={chamados}
          error={error}
          loading={loading}
          page={page}
          setPage={setPage}
          total={total}
        />
      ) : (
        <KanbanChamados />
      )}
    </div>
  );
};

export default Chamados;
