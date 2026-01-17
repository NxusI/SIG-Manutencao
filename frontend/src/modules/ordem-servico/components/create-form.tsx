import DatePicker from "@/shared/components/comon/date-picker";
import CustomSelect from "@/shared/components/comon/select";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { OptionFormatted } from "@/shared/types/components.types";
import { useState } from "react";
import ProdutosOrdem from "./produtos";
import { Button } from "@/shared/components/ui/button";

const CreateOS = () => {
  const [chamado, setChamado] = useState<OptionFormatted | null>(null);

  return (
    <div className="grid gap-2">
      <div className="grid gap-2">
        <Label>Chamado*</Label>
        <CustomSelect
          label="Selecione um chamado"
          onChange={setChamado}
          options={[]}
          value={chamado}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label>Data Prazo*</Label>
          <DatePicker />
        </div>
        <div className="grid gap-2">
          <Label>Valor Serviço*</Label>
          <Input placeholder="R$ 00,00" />
        </div>
      </div>
      <ProdutosOrdem/>
      <div className="grid gap-2">
        <Label>Observação*</Label>
        <Textarea rows={5} />
      </div>
      <Button className="mt-3">
        Salvar
      </Button>
    </div>
  );
};

export default CreateOS;
