import BaseModal from "@/shared/components/comon/base-modal";
import Pagination from "@/shared/components/comon/pagination";
import { Button } from "@/shared/components/ui/button";
import { CardTitle } from "@/shared/components/ui/card";
import { formatDate } from "@/utils/formatters";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import CreateUsuario from "./create-form";
import UpdateUsuario from "./update-form";
import { DataTable } from "@/shared/components/comon/data-table";
import { ConfirmDialog } from "@/shared/components/comon/confirm-dialog";

const Clientes = () => {
  const [page, setPage] = useState<number>(1);

  const data = [
    {
      id: 153246,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 84512,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 13465,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 589645,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 531206,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 364598,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 698643,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 846513,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 89789,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 153124,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 36186,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
    {
      id: 978561,
      nome: "Ana Laura Moura Pereira",
      email: "analaura.moura@gmail.com",
      telefone: "85995426532",
      cadastro: new Date(),
    },
  ];

  const currentRows = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return data.slice(start, end);
  }, [page, data]);
  const total = useMemo(() => Math.ceil(data.length / 10), [data]);

  const handleDelete = (u: any) => {
    const { showDialog } = ConfirmDialog({
      title: "Confirmar Exclusão",
      text: `Tem certeza que deseja excluir o cliente ${u.nome}?`,
      buttonColor: "#b91111ff",
      confirmText: "Excluir",
      onConfirm: () => {
        console.log("excluir");
      },
    });

    showDialog();
  }

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
          <CreateUsuario />
        </BaseModal>
      </div>
      <DataTable
        columns={[
          "id",
          "nome",
          "email",
          "createdAt",
          "edit",
          "delete",
        ]}
        columnLabels={{
          id: "ID",
          nome: "Nome",
          email: "E-mail",
          createdAt: "Data de Cadastro",
          edit: "Editar",
          delete: "Excluir",
        }}
        data={currentRows.map((d) => ({
          ...d,
          createdAt: formatDate(d.cadastro),
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
              <UpdateUsuario />
            </BaseModal>
          ),
          delete: (
            <Button variant={"destructive"} size={"icon"} onClick={() => handleDelete(d)}>
              <Trash2 />
            </Button>
          ),
        }))}
        getRowId={(d) => d.id}
      />
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={total}
      />
    </div>
  );
};

export default Clientes;
