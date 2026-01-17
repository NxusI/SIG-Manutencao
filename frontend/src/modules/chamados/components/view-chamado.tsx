import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatDateString } from "@/utils/formatters";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const EditTile = ({
  title,
  onUpdate,
}: {
  title: string;
  onUpdate: (newTitle: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  const handleBlur = () => {
    setEditing(false);
    if (value !== title) onUpdate(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return editing ? (
    <Input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className="text-xl font-semibold cursor-pointer"
      onClick={() => setEditing(true)}
    >
      {title.toUpperCase()}
    </span>
  );
};

const EditDescription = ({
  description,
  onUpdate,
}: {
  description: string;
  onUpdate: (newDescription: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(description);

  const handleBlur = () => {
    setEditing(false);
    if (value !== description) onUpdate(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return editing ? (
    <Textarea
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className="text-sm cursor-pointer border border-border rounded-lg p-3 text-muted-foreground min-h-[70px]"
      onClick={() => setEditing(true)}
    >
      {description}
    </span>
  );
}

const ViewChamado = ({
  onClose,
  showModal,
  chamado
}: {
  showModal: boolean;
  onClose: () => void;
  chamado: Chamado
}) => {
  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent className="lg:min-w-[40vw]">
        <DialogHeader>
            <DialogTitle>
                <EditTile
                    onUpdate={(newTitle) => console.log(newTitle)}
                    title="Teste"
                />
            </DialogTitle>
        </DialogHeader>
        <div className="grid gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex gap-3 items-center">
                    <strong>Prazo</strong>
                    <span>{formatDateString(chamado.dataChamado)}</span>
                    <ArrowRight size={17}/>
                    <span>{formatDateString(chamado.dataChamado)}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <strong>Cliente</strong>
                  <span>{chamado.cliente.nome}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <strong>Status</strong>
                  <span>{chamado.status.descricao}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <strong>Responsável</strong>
                  <span>{chamado.responsavel?.nome || "Não atribuído"}</span>
                </div>
            </div>
            <EditDescription onUpdate={(newDescription) => console.log(newDescription)} description={chamado.descricao}/>
              <Button variant={"outline"} onClick={onClose} className="hover:scale-105">
                Fechar
              </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChamado;
