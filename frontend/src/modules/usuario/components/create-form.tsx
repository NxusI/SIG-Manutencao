import { TipoUsuario } from "@/domain/usuario/entities/usuario.entity";
import CustomSelect from "@/shared/components/comon/select";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { OptionFormatted } from "@/shared/types/components.types";
import { useState } from "react";
import { useCreateUsuario } from "../hooks/use-usuario";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";

const CreateUsuario = ({ refetch }: { refetch: () => void }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [tipo, setTipo] = useState<OptionFormatted | null>(null);
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { create, loading } = useCreateUsuario();

  const handleSubmit = async () => {
    if (!tipo) return;
    const year = new Date().getFullYear();
    const senha = `rob@${year}`;

    await create({
      data: {
        nome,
        login,
        email,
        senha,
        tipo: tipo.value as TipoUsuario,
      },
    })
      .then(() => {
        setAlertConfig({
          icon: "success",
          title: "Usuário cadastrado com sucesso",
        });
        setEmail("");
        setLogin("");
        setNome("");
        setTipo(null);
        
        setTimeout(() => refetch(), 2000);
      })
      .catch((err) => {
        setAlertConfig({
          icon: "warning",
          title:
            err.response.data.message || "Iconsistência ao cadastrar usuário",
        });
      })
      .finally(() => setTimeout(() => setAlertConfig(null), 3000));
  };

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
        <Label>Login</Label>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
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
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
      </Button>

      {alertConfig && <ToastAlert {...alertConfig} />}
    </div>
  );
};

export default CreateUsuario;
