import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { formatDateString } from "@/utils/formatters";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useGetStatus, useUpateChamado } from "../hooks/use-chamado";
import { ToastAlert } from "@/shared/components/comon/alert";
import { EditDescription, EditStatus, EditTile } from "./update-form";

const ViewChamado = ({
  onClose,
  showModal,
  chamado,
  refetch,
}: {
  showModal: boolean;
  onClose: () => void;
  chamado: Chamado;
  refetch: () => void;
}) => {
  const { status } = useGetStatus();
  const { update } = useUpateChamado();

  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    title: string;
    icon: "success" | "error" | "warning" | "info";
  } | null>(null);

  const handleUpdateChamado = async (data: Partial<Chamado>) => {
    await update({ id: chamado.idChamado, data })
      .then(() => {
        setAlertConfig({
          id: Date.now(),
          title: "Chamado atualizado com sucesso!",
          icon: "success",
        });
        setTimeout(() => refetch(), 1000);
      })
      .catch((err) => {
        setAlertConfig({
          id: Date.now(),
          title: err.response.data.message || "Erro ao atualizar chamado",
          icon: "error",
        });
      })
      .finally(() => setTimeout(() => setAlertConfig(null), 1000));
  };

  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent className="lg:min-w-[40vw]">
        <DialogHeader>
          <DialogTitle>
            <EditTile
              title={chamado.titulo}
              onUpdate={(titulo) => handleUpdateChamado({ titulo })}
            />
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="flex gap-3 items-center">
              <strong>Prazo</strong>
              <span>{formatDateString(chamado.dataSolicitacao)}</span>
              <ArrowRight size={17} />
              <span>
                {formatDateString(chamado.dataFechamento || undefined)}
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <strong>Cliente</strong>
              <span>{chamado.cliente.nome}</span>
            </div>

            <EditStatus
              statusAtual={chamado.status}
              opcoes={status.map((s) => ({
                value: String(s.idStatus),
                label: s.descricao,
              }))}
              onUpdate={(idStatus) => handleUpdateChamado({ idStatus })}
            />

            <div className="flex gap-3 items-center">
              <strong>Responsável</strong>
              <span>{chamado.responsavel?.nome || "Não atribuído"}</span>
            </div>

            <div className="flex gap-3 items-center">
              <strong>Confirmação Cliente</strong>
              <span>{formatDateString(chamado.dataConfirmacao || undefined) || "-"}</span>
            </div>
          </div>

          <EditDescription
            description={chamado.descricao}
            onUpdate={(descricao) => handleUpdateChamado({ descricao })}
          />
        </div>

        {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
      </DialogContent>
    </Dialog>
  );
};

export default ViewChamado;
