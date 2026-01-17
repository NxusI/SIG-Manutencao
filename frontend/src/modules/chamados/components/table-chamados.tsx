import BaseModal from "@/shared/components/comon/base-modal";
import { DataTable } from "@/shared/components/comon/data-table";
import { Button } from "@/shared/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { formatTelefone } from "@/utils/formatters";
import TableSkeleton from "@/shared/components/skeleton/table";
import Pagination from "@/shared/components/comon/pagination";
import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { useState } from "react";
import ViewChamado from "./view-chamado";
import { ConfirmDialog } from "@/shared/components/comon/confirm-dialog";

const TableChamados = ({
  loading,
  chamados,
  error,
  total,
  page,
  setPage,
}: {
  loading: boolean;
  chamados: Chamado[];
  error: string | null;
  total: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [chamado, setChamado] = useState<Chamado | null>(null);

  const handleDelete = (c: Chamado) => {
    const { showDialog } = ConfirmDialog({
      title: `Confirmar exclusão`,
      text: `Tem certeza de que deseja excluir o chamado ${c.titulo}?`,
      confirmText: "Excluir",
      buttonColor: "#b91111ff",
      onConfirm: () => {
        console.log("excluido");
      },
    });

    showDialog();
  };

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
            "data",
            "edit",
            "delete",
          ]}
          columnLabels={{
            idChamado: "ID",
            titulo: "Título",
            nomeCliente: "Cliente",
            telefone: "Telefone",
            equipamento: "Equipamento",
            responsavel: "Responsável",
            data: "Data Solicitação",
            edit: "Editar",
            delete: "Excluir",
          }}
          data={chamados.map((d) => ({
            ...d,
            nomeCliente: d.cliente.nome,
            telefone: formatTelefone(d.cliente.telefone),
            data: new Date(d.dataChamado).toLocaleDateString(),
            responsavel: d.responsavel?.nome || "-",
            edit: (
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => handleView(d)}
              >
                <Edit />
              </Button>
            ),
            delete: (
              <Button variant={"destructive"} size={"icon"} onClick={() => handleDelete(d)}>
                <Trash2 />
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
        />
      )}
    </>
  );
};

export default TableChamados;
