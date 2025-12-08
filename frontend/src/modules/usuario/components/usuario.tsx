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
import { useGetAllUsuarios } from "../hooks/use-usuario";
import TableSkeleton from "@/shared/components/skeleton/table";

const Usuarios = () => {
  const [page, setPage] = useState<number>(1);
  const { error, loading, usuarios, total } = useGetAllUsuarios({
    limit: 10,
    page,
  });

  const handleDelete = (u: any) => {
    const { showDialog } = ConfirmDialog({
      title: "Confirmar Exclusão",
      text: `Tem certeza que deseja excluir o usuário ${u.nome}?`,
      buttonColor: "#b91111ff",
      confirmText: "Excluir",
      onConfirm: () => {
        console.log("excluir");
      },
    });

    showDialog();
  };

  console.log(usuarios);

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
          <CreateUsuario />
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
          columns={["idUsuario", "nome", "email", "login", "edit", "delete"]}
          columnLabels={{
            idUsuario: "ID",
            nome: "Nome",
            email: "E-mail",
            login: "Login",
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
                <UpdateUsuario />
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
