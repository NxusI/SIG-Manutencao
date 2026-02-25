import BaseModal from "@/shared/components/comon/base-modal";
import Pagination from "@/shared/components/comon/pagination";
import { Button } from "@/shared/components/ui/button";
import { CardTitle } from "@/shared/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import CreateUsuario from "./create-form";
import UpdateUsuario from "./update-form";
import { DataTable } from "@/shared/components/comon/data-table";
import { ConfirmDialog } from "@/shared/components/comon/confirm-dialog";
import { useDeleteCliente, useGetAllCliente } from "../hooks/use-cliente";
import { Cliente } from "@/domain/cliente/entities/cliente.entity";
import TableSkeleton from "@/shared/components/skeleton/table";
import { ToastAlert } from "@/shared/components/comon/alert";
import { formatTelefone } from "@/utils/formatters";
import FilterCliente from "./search-filter";

const Clientes = () => {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const params = useMemo(() => {
    return {
      nome,
      telefone,
      email,
      page,
      limit: 7,
    };
  }, [nome, telefone, email, page]);

  const { clientes, error, loading, refetch, total } = useGetAllCliente(params);
  const { delete: deleteCliente } = useDeleteCliente();

  const onFilter = (nome: string, telefone: string, email: string) => {
    setNome(nome);
    setTelefone(telefone);
    setEmail(email);
    setPage(1);
  };

  const handleDelete = (c: Cliente) => {
    const { showDialog } = ConfirmDialog({
      title: "Confirmar Exclusão",
      text: `Tem certeza que deseja excluir o cliente ${c.nome}?`,
      buttonColor: "#b91111ff",
      confirmText: "Excluir",
      onConfirm: async () => {
        await deleteCliente({ id: c.idCliente })
          .then(() => {
            setAlertConfig({
              icon: "success",
              title: "Cliente excluido com sucesso",
            });
            setTimeout(() => refetch(), 1000);
          })
          .catch((err) => {
            setAlertConfig({
              icon: "warning",
              title:
                err.response.data.message || "Iconsistência ao excluir cliente",
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
        <CardTitle className="text-xl">Gerenciar Clientes</CardTitle>
        <BaseModal
          size="md"
          title="Cadastrar Novo Cliente"
          description="Preencha as informações abaixo para cadastrar um novo cliente"
          trigger={
            <Button>
              <Plus /> Adicionar Cliente
            </Button>
          }
        >
          <CreateUsuario refetch={refetch} />
        </BaseModal>
      </div>
      <FilterCliente onFilter={onFilter} />
      {loading ? (
        <TableSkeleton columns={5} rows={7} />
      ) : error ? (
        <p className="w-full text-center text-yellow-600 text-lg">
          Ocorreu uma inconsistência ao buscar os usuários cadastrados
        </p>
      ) : !clientes || !clientes.length ? (
        <p className="w-full text-center text-muted-foreground text-lg">
          Nenhum cliente cadastrado
        </p>
      ) : (
        <DataTable
          columns={["idCliente", "nome", "email", "telefone", "edit", "delete"]}
          columnLabels={{
            idCliente: "ID",
            nome: "Nome",
            email: "E-mail",
            telefone: "Telefone",
            edit: "Editar",
            delete: "Excluir",
          }}
          data={clientes.map((d) => ({
            ...d,
            telefone: formatTelefone(d.telefone),
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
                <UpdateUsuario cliente={d} refetch={refetch} />
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
          getRowId={(d) => d.idCliente}
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

export default Clientes;
