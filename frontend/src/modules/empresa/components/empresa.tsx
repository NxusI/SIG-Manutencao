import BaseModal from "@/shared/components/comon/base-modal";
import Pagination from "@/shared/components/comon/pagination";
import { Button } from "@/shared/components/ui/button";
import { CardTitle } from "@/shared/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DataTable } from "@/shared/components/comon/data-table";
import { ConfirmDialog } from "@/shared/components/comon/confirm-dialog";
import TableSkeleton from "@/shared/components/skeleton/table";
import { ToastAlert } from "@/shared/components/comon/alert";
import { useDeleteEmpresa, useGetAllEmpresa } from "../hooks/use-empresa";
import { Empresa } from "@/domain/empresa/entities/empresa.entity";
import { formatCNPJ, formatTelefone } from "@/utils/formatters";
import CreateEmpresa from "./create-form";
import UpdateEmpresa from "./update-form";

const Empresas = () => {
  const { empresa, error, loading, refetch } = useGetAllEmpresa();
  const { delete: deleteCliente } = useDeleteEmpresa();

  const [page, setPage] = useState<number>(1);
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const currentRows = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return empresa.slice(start, end);
  }, [page, empresa]);
  const total = useMemo(() => Math.ceil(empresa.length / 10), [empresa]);

  const handleDelete = (c: Empresa) => {
    const { showDialog } = ConfirmDialog({
      title: "Confirmar Exclusão",
      text: `Tem certeza que deseja excluir a empresa ${c.nomeFantasia}?`,
      buttonColor: "#b91111ff",
      confirmText: "Excluir",
      onConfirm: async () => {
        await deleteCliente({ id: c.idEmpresa })
          .then(() => {
            setAlertConfig({
              icon: "success",
              title: "Empresa excluida com sucesso",
            });
            setTimeout(() => refetch(), 1000);
          })
          .catch((err) => {
            setAlertConfig({
              icon: "warning",
              title:
                err.response.data.message || "Iconsistência ao excluir empresa",
            });
          })
          .finally(() => setTimeout(() => setAlertConfig(null), 3000));
      },
    });

    showDialog();
  };

  return (
    <div className="grid gap-5">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl">Gerenciar Empresas</CardTitle>
        <BaseModal
          size="lg"
          title="Cadastrar Nova Empresa"
          description="Preencha as informações abaixo para cadastrar uma nova Empresa"
          trigger={
            <Button>
              <Plus /> Adicionar Empresa
            </Button>
          }
        >
          <CreateEmpresa refetch={refetch}/>
        </BaseModal>
      </div>
      {loading ? (
        <TableSkeleton columns={5} rows={7} />
      ) : error ? (
        <p className="w-full text-center text-yellow-600 text-lg">
          Ocorreu uma inconsistência ao buscar as empresas
          cadastradas
        </p>
      ) : !empresa || !empresa.length ? (
        <p className="w-full text-center text-muted-foreground text-lg">
          Nenhuma empresa cadastrado
        </p>
      ) : (
        <DataTable
          columns={[
            "nomeFantasia",
            "cnpj",
            "endereco",
            "telefone",
            "createdAt",
            "edit",
            "delete",
          ]}
          columnLabels={{
            nomeFantasia: "Nome",
            cnpj: "CNPJ",
            endereco: "Endereço",
            telefone: "Telefone",
            createdAt: "Data Cadastro",
            edit: "Editar",
            delete: "Excluir",
          }}
          data={currentRows.map((d) => ({
            ...d,
            cnpj: d.cnpj ? formatCNPJ(d.cnpj) : "-",
            endereco: d.endereco ? d.endereco : "-",
            telefone: d.telefone ? formatTelefone(d.telefone) : "-",
            createdAt: new Date(d.createdAt).toLocaleDateString("pt-BR"),
            edit: (
              <BaseModal
                title="Atualizar Cliente"
                description="Altere as informações abaixo para atualizar o cadastro do cliente"
                size="md"
                trigger={
                  <Button variant={"secondary"} size={"icon"}>
                    <Edit />
                  </Button>
                }
              >
                <UpdateEmpresa empresa={d} refetch={refetch}/>
              </BaseModal>
            ),
            delete: (
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => handleDelete(d)}
              >
                <Trash2 />
              </Button>
            ),
          }))}
          getRowId={(d) => d.idEmpresa}
        />
      )}
      {total > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={total}
        />
      )}

      {alertConfig && <ToastAlert {...alertConfig} />}
    </div>
  );
};

export default Empresas;
