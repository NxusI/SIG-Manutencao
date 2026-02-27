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
import { useGetAllEmpresa } from "@/modules/empresa/hooks/use-empresa";

const CreateUsuario = ({ refetch }: { refetch: () => void }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [tipo, setTipo] = useState<OptionFormatted | null>(null);
  const [empresa, setEmpresa] = useState<OptionFormatted | null>(null);
  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { create, loading } = useCreateUsuario();
  const { empresa: empresas, loading: loadingEmpresa } = useGetAllEmpresa();

  const handleSubmit = async () => {
    const year = new Date().getFullYear();
    const senha = `rob@${year}`;

    if (!nome) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Nome' não foi preenchido",
      });
      return;
    }

    if (!email) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'E-mail' não foi preenchido",
      });
      return;
    }

    if (!login) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Login' não foi preenchido",
      });
      return;
    }

    if (!tipo) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Tipo' não foi preenchido",
      });
      return;
    }

    if (!empresa) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Empresa' não foi preenchido",
      });
      return;
    }

    await create({
      data: {
        nome,
        login,
        email,
        senha,
        tipo: tipo.value as TipoUsuario,
        idEmpresa: Number(empresa.value),
      },
    })
      .then(() => {
        setAlertConfig({
          id: Date.now(),
          icon: "success",
          title: "Usuário cadastrado com sucesso",
        });
        setEmail("");
        setLogin("");
        setNome("");
        setTipo(null);
        setEmpresa(null);

        setTimeout(() => refetch(), 2000);
      })
      .catch((err) => {
        setAlertConfig({
          id: Date.now(),
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
        <Label>Nome*</Label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>E-mail*</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@exemplo.com"
          type="email"
        />
      </div>
      <div className="grid gap-2">
        <Label>Login*</Label>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Tipo*</Label>
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
      <div className="grid gap-2">
        <Label>Empresa*</Label>
        <CustomSelect
          label="Selecione uma Empresa"
          onChange={setEmpresa}
          options={empresas.map((e) => ({ value: String(e.idEmpresa), label: e.nomeFantasia }))}
          value={empresa}
          loading={loadingEmpresa}
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
      </Button>

      {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
    </div>
  );
};

export default CreateUsuario;
