import BaseModal from "@/shared/components/comon/base-modal";
import { Button } from "@/shared/components/ui/button";
import { Info, Plus } from "lucide-react";
import CreateOS from "./create-form";
import { useGetAllOrdemServico } from "../hooks/use-ordem-servico";
import TableSkeleton from "@/shared/components/skeleton/table";
import { DataTable } from "@/shared/components/comon/data-table";
import { formatCurrency, formatDateString } from "@/utils/formatters";
import Infor from "./infor";

const OrdemServico = () => {
  const { error, loading, ordens, refetch } = useGetAllOrdemServico();

  return (
    <div className="grid gap-5">
      <div className="flex justify-end">
        <BaseModal
          size="xl"
          title="Cadastrar nova Ordem de Serviço"
          description="Preencha as informações abaixo para criar uma nova Ordem de Serviço"
          trigger={
            <Button>
              <Plus /> Criar OS
            </Button>
          }
        >
          <CreateOS refetch={refetch} />
        </BaseModal>
      </div>
      {loading ? (
        <TableSkeleton columns={5} rows={7} />
      ) : error ? (
        <p className="w-full text-center text-yellow-600 text-lg">
          Ocorreu uma inconsistência ao buscar as ordens de serviço emitidas
        </p>
      ) : !ordens || !ordens.length ? (
        <p className="w-full text-center text-muted-foreground text-lg">
          Nenhuma ordem de serviço cadastrada
        </p>
      ) : (
        <DataTable
          columns={["chamado", "createdAt", "dataPrazo", "valor", "infor"]}
          columnLabels={{
            chamado: "Chamado",
            createdAt: "Data Emissão",
            dataPrazo: "Data Prazo",
            valor: "Valor Total",
            infor: "Infor",
          }}
          data={ordens.map((d) => ({
            ...d,
            chamado: d.chamado.titulo,
            createdAt: formatDateString(d.createdAt),
            dataPrazo: formatDateString(d.dataPrazo),
            valor: formatCurrency(d.valor),
            infor: (
              <BaseModal
              size="lg"
                title={`Dados Ordem de Serviço #${d.idOS}`}
                trigger={
                  <Button>
                    <Info />
                  </Button>
                }
              >
                <Infor os={d}/>
              </BaseModal>
            ),
          }))}
          getRowId={(d) => d.idOS}
        />
      )}
    </div>
  );
};

export default OrdemServico;
