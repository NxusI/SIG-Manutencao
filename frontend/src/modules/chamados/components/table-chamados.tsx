import BaseModal from "@/shared/components/comon/base-modal";
import { DataTable } from "@/shared/components/comon/data-table";
import { Button } from "@/shared/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const TableChamados = () => {
  const [currentRows, setCurrentRows] = useState<any>([]);

  return (
    <>
      {!currentRows.length ? (
        <div className="flex justify-center p-2">
          <p className="text-muted-foreground">Nenhum chamado encontrado</p>
        </div>
      ) : (
        <DataTable
          columns={[
            "idChamado",
            "nomeCliente",
            "equipamento",
            "telefone",
            "createdAt",
            "edit",
            "delete",
          ]}
          columnLabels={{   
            idChamado: "ID",
            nomeCliente: "Cliente",
            telefone: "Telefone",
            equipamento: "Equipamento",
            createdAt: "Data Solicitação",
            edit: "Editar",
            delete: "Excluir",
          }}
          data={currentRows.map((d) => ({
            ...d,
            edit: (
              <BaseModal
                title="Atualizar Chamado"
                description="Altere as informações abaixo para atualizar o cadastro do cliente"
                size="md"
                trigger={
                  <Button variant={"secondary"} size={"icon"}>
                    <Edit />
                  </Button>
                }
              >
                <></>
              </BaseModal>
            ),
            delete: (
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => {}}
              >
                <Trash2 />
              </Button>
            ),
          }))}
          getRowId={(d) => d.idChamado as number}
        />
      )}
    </>
  );
};

export default TableChamados;
