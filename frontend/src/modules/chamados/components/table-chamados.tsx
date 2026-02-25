import { DataTable } from "@/shared/components/comon/data-table";
import { Button } from "@/shared/components/ui/button";
import { Info } from "lucide-react";
import { formatDateString, formatTelefone } from "@/utils/formatters";
import TableSkeleton from "@/shared/components/skeleton/table";
import Pagination from "@/shared/components/comon/pagination";
import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { useState } from "react";
import ViewChamado from "./view-chamado";

const TableChamados = ({
  loading,
  chamados,
  error,
  total,
  page,
  setPage,
  refetch,
}: {
  loading: boolean;
  chamados: Chamado[];
  error: string | null;
  total: number;
  page: number;
  setPage: (page: number) => void;
  refetch: () => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [chamado, setChamado] = useState<Chamado | null>(null);

  const handleView = (c: Chamado) => {
    setChamado(c);
    setShowModal(true);
  };

  return (
    <>
      {loading ? (
        <TableSkeleton columns={7} rows={7} />
      ) : !chamados.length ? (
        <div className="flex justify-center p-2">
          <p className="text-muted-foreground">Nenhum chamado encontrado</p>
        </div>
      ) : error ? (
        <div className="flex justify-center p-2">
          <p className="text-yellow-600">{error}</p>
        </div>
      ) : (
        <DataTable
          columns={[
            "idChamado",
            "titulo",
            "nomeCliente",
            "telefone",
            "equipamento",
            "responsavel",
            "status",
            "data",
            "dataConfirmacao",
            "dataFechamento",
            "edit",
          ]}
          columnLabels={{
            idChamado: "ID",
            titulo: "Título",
            nomeCliente: "Cliente",
            telefone: "Telefone",
            equipamento: "Equipamento",
            responsavel: "Responsável",
            data: "Data Solicitação",
            dataConfirmacao: "Data Confirmação",
            dataFechamento: "Data Fechamento",
            edit: "Detalhes",
            status: "Status",
          }}
          data={chamados.map((d) => ({
            ...d,
            status: d.status.descricao,
            nomeCliente: d.cliente.nome,
            telefone: formatTelefone(d.cliente.telefone),
            data: new Date(d.dataSolicitacao).toLocaleDateString(),
            dataFechamento: formatDateString(d.dataFechamento || undefined),
            responsavel: d.responsavel?.nome || "-",
            dataConfirmacao: formatDateString(d.dataConfirmacao || undefined),
            edit: (
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => handleView(d)}
              >
                <Info />
              </Button>
            ),
          }))}
          getRowId={(d) => d.idChamado as number}
        />
      )}
      {total > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={total}
        />
      )}

      {showModal && chamado && (
        <ViewChamado
          chamado={chamado}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default TableChamados;
