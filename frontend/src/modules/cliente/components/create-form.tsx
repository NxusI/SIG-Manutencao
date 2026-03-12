import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { useCreateCliente } from "../hooks/use-cliente";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";
import { formatTelefone } from "@/utils/formatters";
import { useGetAllEmpresa } from "@/modules/empresa/hooks/use-empresa";
import { OptionFormatted } from "@/shared/types/components.types";
import CustomSelect from "@/shared/components/comon/select";

const CreateForm = ({ refetch }: { refetch: () => void }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [empresa, setEmpresa] = useState<OptionFormatted | null>(null);
  const [endereco, setEndereco] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { create, loading } = useCreateCliente();
  const { empresa: empresas, loading: loadingEmpresa } = useGetAllEmpresa();

  useEffect(() => {
    const clean = cep.replace(/\D/g, "");

    const timeout = setTimeout(() => {
      if (clean.length === 8 && numero) {
        fetch(`https://brasilapi.com.br/api/cep/v1/${clean}`)
          .then((res) => res.json())
          .then((data) => {
            setEndereco(
              `${data.street}, ${numero} - ${data.neighborhood}, ${data.city}-${data.state}`,
            );
          })
          .catch((e) => console.error(e));
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cep, numero]);

  const handleSubmit = async () => {
    if (!nome || !email || !telefone || !empresa) {
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
        idEmpresa: Number(empresa.value),
        endereco,
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
        setEmpresa(null);
        setTimeout(() => refetch(), 2000);
      })
      .catch((err) => {
        setAlertConfig({
          icon: "error",
          title: err.response.data.message || "Erro ao cadastrar cliente",
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
      <div className="grid gap-2">
        <Label>Empresa*</Label>
        <CustomSelect
          label="Selecione uma Empresa"
          onChange={setEmpresa}
          options={empresas.map((e) => ({
            value: String(e.idEmpresa),
            label: e.nomeFantasia,
          }))}
          value={empresa}
          loading={loadingEmpresa}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label>CEP</Label>
          <Input value={cep} onChange={(e) => setCep(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Número</Label>
          <Input value={numero} onChange={(e) => setNumero(e.target.value)} />
        </div>
      </div>
      {endereco && (
        <div className="grid gap-2">
          <Label>Endereco</Label>
          <Input value={endereco} disabled />
        </div>
      )}
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
      </Button>

      {alertConfig && <ToastAlert {...alertConfig} />}
    </div>
  );
};

export default CreateForm;
