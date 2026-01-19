import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { formatTelefone } from "@/utils/formatters";
import { useState } from "react";
import { useUpdateEmpresa } from "../hooks/use-empresa";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";
import { Empresa } from "@/domain/empresa/entities/empresa.entity";

const UpdateEmpresa = ({
  refetch,
  empresa,
}: {
  refetch: () => void;
  empresa: Empresa;
}) => {
  const [nome, setNome] = useState<string>(empresa.nomeFantasia);
  const [cnpj, setCnpj] = useState<string>(empresa.cnpj);
  const [telefone, setTelefone] = useState<string>(empresa.telefone);
  const [endereco, setEndereco] = useState<string>(empresa.endereco);
  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { update, loading } = useUpdateEmpresa();

  const handleSubmit = async () => {
    if (!nome) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Nome Fantasia' não foi preenchido",
      });
      setTimeout(() => setAlertConfig(null), 3000);
      return;
    }

    if (!cnpj) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'CNPJ' não foi preenchido",
      });
      setTimeout(() => setAlertConfig(null), 3000);
      return;
    }

    if (!telefone) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Telefone' não foi preenchido",
      });
      setTimeout(() => setAlertConfig(null), 3000);
      return;
    }

    if (!endereco) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "O campo 'Endereço' não foi preenchido",
      });
      setTimeout(() => setAlertConfig(null), 3000);
      return;
    }

    // Verifica quais campos foram alterados
    const updatedData: Partial<Empresa> = {};
    const alteredFields: string[] = [];

    if (nome !== empresa.nomeFantasia) {
      updatedData.nomeFantasia = nome;
      alteredFields.push("Nome Fantasia");
    }

    if (cnpj.replace(/\D/g, "") !== empresa.cnpj.replace(/\D/g, "")) {
      updatedData.cnpj = cnpj.replace(/\D/g, "");
      alteredFields.push("CNPJ");
    }

    if (telefone.replace(/\D/g, "") !== empresa.telefone.replace(/\D/g, "")) {
      updatedData.telefone = telefone.replace(/\D/g, "");
      alteredFields.push("Telefone");
    }

    if (endereco !== empresa.endereco) {
      updatedData.endereco = endereco;
      alteredFields.push("Endereço");
    }

    if (alteredFields.length === 0) {
      setAlertConfig({
        id: Date.now(),
        icon: "info",
        title: "Nenhum campo foi alterado",
      });
      setTimeout(() => setAlertConfig(null), 3000);
      return;
    }

    await update({
      id: empresa.idEmpresa,
      data: updatedData,
    })
      .then(() => {
        setAlertConfig({
          id: Date.now(),
          icon: "success",
          title: `Campos atualizados: ${alteredFields.join(", ")}`,
        });

        setTimeout(() => refetch(), 1000);
      })
      .catch((err) => {
        setAlertConfig({
          id: Date.now(),
          icon: "warning",
          title:
            err.response?.data?.message ||
            "Inconsistência ao atualizar empresa",
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
        <Label>Endereço*</Label>
        <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </div>
      <Button className="mt-3" onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Salvar"}
      </Button>

      {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
    </div>
  );
};

export default UpdateEmpresa;
