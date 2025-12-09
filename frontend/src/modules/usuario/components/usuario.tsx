import BaseModal from "@/shared/components/comon/base-modal";
import Pagination from "@/shared/components/comon/pagination";
import { Button } from "@/shared/components/ui/button";
import { CardTitle } from "@/shared/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateUsuario from "./create-form";
import UpdateUsuario from "./update-form";
import { DataTable } from "@/shared/components/comon/data-table";
import { ConfirmDialog } from "@/shared/components/comon/confirm-dialog";
import { useDeleteUsuario, useGetAllUsuarios } from "../hooks/use-usuario";
import TableSkeleton from "@/shared/components/skeleton/table";
import { Usuario } from "@/domain/usuario/entities/usuario.entity";

const Usuarios = () => {
  const [page, setPage] = useState<number>(1);
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { delete: deleteUsuario } = useDeleteUsuario();
  const { error, loading, usuarios, total, refetch } = useGetAllUsuarios({
    limit: 10,
    page,
  });

  const handleDelete = (u: Usuario) => {
    const { showDialog } = ConfirmDialog({
      title: "Confirmar Exclusão",
      text: `Tem certeza que deseja excluir o usuário ${u.nome}?`,
      buttonColor: "#b91111ff",
      confirmText: "Excluir",
      onConfirm: async () => {
        await deleteUsuario(u.idUsuario)
          .then(() => {
            setAlertConfig({
              icon: "success",
              title: "Usuário excluido com sucesso",
            });
            setTimeout(() => refetch(), 3000);
          })
          .catch((err) => {
            setAlertConfig({
              icon: "warning",
              title:
                err.response.data.message || "Iconsistência ao excluir usuário",
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
        <CardTitle className="text-xl">Gerenciar Usuários</CardTitle>
        <BaseModal
          size="md"
          title="Cadastrar Novo Usuário"
          description="Preencha as informações abaixo para cadastrar um novo usuário"
          trigger={
            <Button>
              <Plus /> Adicionar Usuário
            </Button>
          }
        >
          <CreateUsuario refetch={refetch} />
        </BaseModal>
      </div>
      {loading ? (
        <TableSkeleton columns={6} rows={7} />
      ) : error ? (
        <p className="w-full text-center text-yellow-600 text-lg">
          Ocorreu uma inconsistência ao buscar os usuários cadastrados
        </p>
      ) : !usuarios || !usuarios.length ? (
        <p className="w-full text-center text-muted-foreground text-lg">
          Nenhum usuário cadastrado
        </p>
      ) : (
        <DataTable
          columns={["idUsuario", "nome", "email", "login", "tipo", "edit", "delete"]}
          columnLabels={{
            idUsuario: "ID",
            nome: "Nome",
            email: "E-mail",
            login: "Login",
            tipo: "Tipo",
            edit: "Editar",
            delete: "Excluir",
          }}
          data={usuarios.map((d) => ({
            ...d,
            edit: (
              <BaseModal
                title="Atualizar Usuário"
                description="Altere as informações abaixo para atualizar o cadastro do usuário"
                size="md"
                trigger={
                  <Button variant={"secondary"} size={"icon"}>
                    <Edit />
                  </Button>
                }
              >
                <UpdateUsuario refetch={refetch} usuario={d} />
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
          getRowId={(d) => d.idUsuario}
        />
      )}
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={total}
      />
    </div>
  );
};

export default Usuarios;
