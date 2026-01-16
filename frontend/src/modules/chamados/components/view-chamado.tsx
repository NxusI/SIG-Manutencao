import { Chamado } from "@/domain/chamado/entities/chamado.entity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
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
      <DialogContent className="lg:min-w-[65vw]">
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
                
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChamado;
