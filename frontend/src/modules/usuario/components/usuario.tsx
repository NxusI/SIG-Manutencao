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
import { useDeleteUsuario, useGetAllUsuarios } from "../hooks/use-usuario";
import TableSkeleton from "@/shared/components/skeleton/table";
import { Usuario } from "@/domain/usuario/entities/usuario.entity";
import FilterUsuario from "./search-filter";
import { ToastAlert } from "@/shared/components/comon/alert";
import { OptionFormatted } from "@/shared/types/components.types";

const Usuarios = () => {
  const [page, setPage] = useState<number>(1);
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [tipo, setTipo] = useState<OptionFormatted | null>(null);
  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const params = useMemo(() => {
    return {
      nome,
      email,
      login,
      ...(tipo ? { tipo: tipo.value } : {}),
      limit: 7,
      page,
    };
  }, [nome, email, tipo, page, login]);

  const { delete: deleteUsuario } = useDeleteUsuario();
  const { error, loading, usuarios, total, refetch } =
    useGetAllUsuarios(params);

  const onFilter = (
    nome: string,
    email: string,
    login: string,
    tipo: OptionFormatted | null,
  ) => {
    setNome(nome);
    setEmail(email);
    setTipo(tipo);
    setLogin(login);
    setPage(1);
  };

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
              id: Date.now(),
              icon: "success",
              title: "Usuário excluido com sucesso",
            });
            setTimeout(() => refetch(), 3000);
          })
          .catch((err) => {
            setAlertConfig({
              id: Date.now(),
              icon: "warning",
              title:
                err.response.data.message || "Iconsistência ao excluir usuário",
            });
          })
          .finally(() => setTimeout(() => setAlertConfig(null), 1000));
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
      <FilterUsuario onFilter={onFilter} />
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
          columns={[
            "idUsuario",
            "nome",
            "email",
            "login",
            "tipo",
            "edit",
            "delete",
          ]}
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
      {total > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={total}
        />
      )}

      {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
    </div>
  );
};

export default Usuarios;
