import { TipoUsuario } from "@/domain/usuario/entities/usuario.entity";
import CustomSelect from "@/shared/components/comon/select";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { OptionFormatted } from "@/shared/types/components";
import { useState } from "react";

const UpdateUsuario = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tipo, setTipo] = useState<OptionFormatted | null>(null);

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label>Nome</Label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>E-mail</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@exemplo.com"
          type="email"
        />
      </div>
      <div className="grid gap-2">
        <Label>Tipo</Label>
        <CustomSelect
          label="Selecione um Tipo Usuário"
          onChange={setTipo}
          options={Object.keys(TipoUsuario).map((t) => ({
            value: t,
            label: t,
          }))}
          value={tipo}
        />
      </div>
      <Button>Atualizar</Button>
    </div>
  );
};

export default UpdateUsuario;
