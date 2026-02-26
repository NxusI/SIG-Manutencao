import BaseModal from "@/shared/components/comon/base-modal";
import { Button } from "@/shared/components/ui/button";
import { Check, Info, Loader2, Plus } from "lucide-react";
import CreateOS from "./create-form";
import {
  useFinalizarOrdem,
  useGetAllOrdemServico,
} from "../hooks/use-ordem-servico";
import TableSkeleton from "@/shared/components/skeleton/table";
import { DataTable } from "@/shared/components/comon/data-table";
import { formatCurrency, formatDateString } from "@/utils/formatters";
import Infor from "./infor";
import { useState } from "react";
import { ToastAlert } from "@/shared/components/comon/alert";

const OrdemServico = () => {
  const [alertconfig, setalertconfig] = useState<{
    id: number;
    title: string;
    icon: "success" | "error" | "warning" | "info";
  } | null>(null);

  const { error, loading, ordens, refetch } = useGetAllOrdemServico();
  const { finalizar, loading: loadingFinalizar } = useFinalizarOrdem();

  const handleSubmit = async (id: number) => {
    await finalizar({ id })
      .then(() => {
        setalertconfig({
          id: Date.now(),
          icon: "success",
          title: "Ordem de serviço finalizada com sucesso!",
        });
      })
      .catch((err) => {
        setalertconfig({
          id: Date.now(),
          icon: "error",
          title:
            err.response.data.message ||
            "Houe uma inconsistência ao finalizar ordem de serviço",
        });
      })
      .finally(() => setTimeout(() => setalertconfig(null), 1000));
  };

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
          columns={[
            "chamado",
            "createdAt",
            "dataPrazo",
            "valor",
            "infor",
            "confirm",
          ]}
          columnLabels={{
            chamado: "Chamado",
            createdAt: "Data Emissão",
            dataPrazo: "Data Prazo",
            valor: "Valor Total",
            infor: "Infor",
            confirm: "Finalizar",
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
                  <Button variant={"outline"}>
                    <Info />
                  </Button>
                }
              >
                <Infor os={d} />
              </BaseModal>
            ),
            confirm: (
              <BaseModal
                size="md"
                title={`Finalizar Ordem de Serviço`}
                description="Ao finalizar a OS, você confirma a prestação e conclusão de todos os serviços requeridos."
                trigger={
                  <Button>
                    <Check />
                  </Button>
                }
              >
                <Button
                  className="w-full"
                  disabled={loadingFinalizar}
                  onClick={() => handleSubmit(d.idOS)}
                >
                  {loadingFinalizar ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Finalizar"
                  )}
                </Button>
              </BaseModal>
            ),
          }))}
          getRowId={(d) => d.idOS}
        />
      )}

      {alertconfig && <ToastAlert {...alertconfig} key={alertconfig.id} />}
    </div>
  );
};

export default OrdemServico;
