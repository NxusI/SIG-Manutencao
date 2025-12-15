import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useCreateCliente } from "../hooks/use-cliente";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";
import { formatTelefone } from "@/utils/formatters";

const CreateForm = ({refetch}: {refetch: () => void}) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { create, loading } = useCreateCliente();

  const handleSubmit = async () => {
    if (!nome || !email || !telefone) {
      setAlertConfig({
        icon: "warning",
        title: "Preencha todos os campos",
      });
      return;
    }

    await create({
      data: {
        nome,
        email,
        telefone,
      },
    })
      .then(() => {
        setAlertConfig({
          icon: "success",
          title: "Cliente cadastrado com sucesso",
        });
        setEmail("");
        setTelefone("");
        setNome("");
        setTimeout(() => refetch(), 2000);
      })
      .catch(() => {
        setAlertConfig({
          icon: "error",
          title: "Erro ao cadastrar cliente",
        });
      })
      .finally(() => setTimeout(() => setAlertConfig(null), 2000));
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
          placeholder="exemplo@exemplo.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>Telefone</Label>
        <Input
          value={formatTelefone(telefone)}
          placeholder="(00) 00000-0000"
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
      </Button>

      {alertConfig && <ToastAlert {...alertConfig} />}
    </div>
  );
};

export default CreateForm;
