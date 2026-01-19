import { ExternalService } from "@/domain/external/external.service";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { formatCEP, formatTelefone } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { useCreateEmpresa } from "../hooks/use-empresa";
import { Loader2 } from "lucide-react";
import { CEP } from "@/domain/external/entities/cep.entity";
import { ToastAlert } from "@/shared/components/comon/alert";

const CreateEmpresa = ({ refetch }: { refetch: () => void }) => {
  const [cep, setCep] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cepObj, setCepObj] = useState<CEP | null>(null);
  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { create, loading } = useCreateEmpresa();

  useEffect(() => {
    if (cep.replace(/\D/g, "").length === 8) {
      const service = new ExternalService();

      service
        .getCep(cep)
        .then((res) => {
          const endereco = `${res.street} - ${res.neighborhood}, ${res.city} - ${res.state}`;
          setEndereco(endereco);
          setCepObj(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cep]);

  const handleSubmit = async () => {
    if (!nome) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Nome Fantasia' não foi preenchido",
      });
      return;
    }

    if (!cnpj) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'CNPJ' não foi preenchido",
      });
      return;
    }

    if (!telefone) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Telefone' não foi preenchido",
      });
      return;
    }

    if (!cep) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'CEP' não foi preenchido",
      });
      return;
    }

    if (!numero) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Número' não foi preenchido",
      });
      return;
    }

    if (!cepObj) return;
    const enderecoFinal = `${cepObj.street}, ${numero}, ${cepObj.neighborhood} - ${cepObj.city} - ${cepObj.state}`;

    await create({
      data: {
        cnpj: cnpj.replace(/\D/g, ""),
        endereco: enderecoFinal,
        nomeFantasia: nome,
        telefone: telefone.replace(/\D/g, ""),
      },
    })
      .then(() => {
        setAlertConfig({
          id: Date.now(),
          icon: "success",
          title: "Empresa criada com sucesso",
        });

        setNome("");
        setCnpj("");
        setTelefone("");
        setCep("");
        setEndereco("");
        setNumero("");
        setTimeout(() => refetch(), 1000);
      })
      .catch((err) => {
        setAlertConfig({
          id: Date.now(),
          icon: "warning",
          title: err.response.data.message || "Iconsistência ao criar empresa",
        });
      })
      .finally(() => {
        setTimeout(() => setAlertConfig(null), 3000);
      });
  };

  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <Label>Nome Fantasia*</Label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>CNPJ*</Label>
        <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Telefone*</Label>
        <Input
          value={formatTelefone(telefone)}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>CEP*</Label>
        <Input
          value={formatCEP(cep)}
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      {endereco && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="grid gap-2 col-span-2">
            <Label>Endereço*</Label>
            <Input
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Número*</Label>
            <Input value={numero} onChange={(e) => setNumero(e.target.value)} />
          </div>
        </div>
      )}
      <Button className="mt-3" onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Salvar"}
      </Button>

      {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
    </div>
  );
};

export default CreateEmpresa;
