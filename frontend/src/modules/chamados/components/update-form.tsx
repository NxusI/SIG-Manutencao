import { Status } from "@/domain/chamado/entities/status.entity";
import CustomSelect from "@/shared/components/comon/select";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { OptionFormatted } from "@/shared/types/components.types";
import { useState } from "react";
import { ActionMeta, SingleValue } from "react-select";

export const EditTile = ({
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

  return editing ? (
    <Input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && handleBlur()}
    />
  ) : (
    <span
      className="text-xl font-semibold cursor-pointer"
      onClick={() => setEditing(true)}
    >
      {value.toUpperCase()}
    </span>
  );
};

export const EditDescription = ({
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

  return editing ? (
    <Textarea
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  ) : (
    <span
      className="text-sm cursor-pointer border border-border rounded-lg p-3 text-muted-foreground min-h-[70px]"
      onClick={() => setEditing(true)}
    >
      {description}
    </span>
  );
};

export const EditStatus = ({
  statusAtual,
  opcoes,
  onUpdate,
}: {
  statusAtual: Status;
  opcoes: OptionFormatted[];
  onUpdate: (novoStatusId: number) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<OptionFormatted | null>({
    label: statusAtual.descricao,
    value: String(statusAtual.idStatus),
  });

  const handleChange = (
    newValue: SingleValue<OptionFormatted>,
    _: ActionMeta<OptionFormatted>,
  ) => {
    if (!newValue) return;
    setStatus(newValue);
    onUpdate(Number(newValue.value));
    setEditing(false);
  };

  return editing ? (
    <div className="flex gap-3 items-center">
      <strong>Status</strong>
      <CustomSelect
        label="Selecione um Status"
        options={opcoes}
        value={status}
        onChange={handleChange}
      />
    </div>
  ) : (
    <div
      className="flex gap-3 items-center cursor-pointer"
      onClick={() => setEditing(true)}
    >
      <strong>Status</strong>
      <span>{status?.label}</span>
    </div>
  );
};
