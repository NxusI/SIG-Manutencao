import BaseModal from "@/shared/components/comon/base-modal";
import { Button } from "@/shared/components/ui/button";
import {
  CalendarClock,
  Check,
  DollarSign,
  Info,
  Loader2,
  Plus,
} from "lucide-react";
import CreateOS from "./create-form";
import {
  useFinalizarOrdem,
  useGetAllOrdemServico,
  usePagamento,
} from "../hooks/use-ordem-servico";
import TableSkeleton from "@/shared/components/skeleton/table";
import { DataTable } from "@/shared/components/comon/data-table";
import { formatCurrency, formatDateString } from "@/utils/formatters";
import Infor from "./infor";
import { useMemo, useState } from "react";
import { ToastAlert } from "@/shared/components/comon/alert";
import Pagination from "@/shared/components/comon/pagination";
import GarantiaForm from "./garantia-form";

const OrdemServico = () => {
  const [page, setPage] = useState<number>(1);
  const [alertconfig, setalertconfig] = useState<{
    id: number;
    title: string;
    icon: "success" | "error" | "warning" | "info";
  } | null>(null);

  const params = useMemo(() => {
    return {
      limit: 7,
      page,
    };
  }, [page]);

  const { error, loading, ordens, refetch, total } =
    useGetAllOrdemServico(params);
  const { pagamento, loading: loadingPagamento } = usePagamento();
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

  const handlePagamento = async (id: number) => {
    await pagamento({ id })
      .then(() => {
        setalertconfig({
          id: Date.now(),
          icon: "success",
          title: "Pagamento registrado com sucesso!",
        });
        refetch();
      })
      .catch((err) => {
        setalertconfig({
          id: Date.now(),
          icon: "error",
          title:
            err.response.data.message ||
            "Houve uma inconsistência ao registrar o pagamento!",
        });
      });
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
            "prazoGarantiaDias",
            "dataEnvioGarantia",
            "dataPagamento",
            "valor",
            "infor",
            "confirm",
            "clock",
            "money",
          ]}
          columnLabels={{
            chamado: "Chamado",
            createdAt: "Data Emissão",
            dataPrazo: "Data Prazo",
            prazoGarantiaDias: "Garantia",
            dataEnvioGarantia: "Envio Garantia",
            dataPagamento: "Data Pagamento",
            valor: "Valor Total",
            infor: "Infor",
            confirm: "Finalizar",
            clock: "Garantia",
            money: "Pagamento",
          }}
          data={ordens.map((d) => ({
            ...d,
            chamado: d.chamado.titulo,
            createdAt: formatDateString(d.createdAt),
            dataPrazo: formatDateString(d.dataPrazo),
            valor: formatCurrency(d.valor),
            prazoGarantiaDias: d.prazoGarantiaDias || "-",
            dataEnvioGarantia: formatDateString(d.dataEnvioGarantia),
            dataPagamento: formatDateString(d?.pagamento?.dataPagamento),
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
            clock: (
              <BaseModal
                size="md"
                title="Emitir Garantia"
                description="Informe ao cliente o prazo de garantia para o serviço realizado"
                trigger={
                  <Button
                    variant={"secondary"}
                    disabled={d.prazoGarantiaDias ? true : false}
                  >
                    <CalendarClock />
                  </Button>
                }
              >
                <GarantiaForm refetch={refetch} id={d.idOS} />
              </BaseModal>
            ),
            money: (
              <BaseModal
                size="md"
                title="Registrar Pagamento"
                description="Realize a baixa do pagamento para confirmar o recebimento do valor integral determinado na OS."
                trigger={
                  <Button variant={"outline"} disabled={d.pagamento ? true : false}>
                    <DollarSign />
                  </Button>
                }
              >
                <Button
                  className="w-full"
                  onClick={() => handlePagamento(d.idOS)}
                  disabled={loadingPagamento}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Registrar"}
                </Button>
              </BaseModal>
            ),
          }))}
          getRowId={(d) => d.idOS}
        />
      )}
      {total > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={total}
        />
      )}

      {alertconfig && <ToastAlert {...alertconfig} key={alertconfig.id} />}
    </div>
  );
};

export default OrdemServico;
