import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { Cliente } from "@/domain/cliente/entities/cliente.entity";
import { useUpdateCliente } from "../hooks/use-cliente";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";
import { ICreateClienteParams } from "@/domain/cliente/params/create-cliente.params";
import { formatTelefone } from "@/utils/formatters";
import CustomSelect from "@/shared/components/comon/select";
import { OptionFormatted } from "@/shared/types/components.types";
import { useGetAllEmpresa } from "@/modules/empresa/hooks/use-empresa";

const UpdateForm = ({
  cliente,
  refetch,
}: {
  cliente: Cliente;
  refetch: () => void;
}) => {
  const [nome, setNome] = useState<string>(cliente.nome);
  const [email, setEmail] = useState<string>(cliente.email);
  const [telefone, setTelefone] = useState<string>(cliente.telefone);
  const [empresa, setEmpresa] = useState<OptionFormatted | null>(null);
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { loading, update } = useUpdateCliente();
  const { empresa: empresas, loading: loadingEmpresa } = useGetAllEmpresa();

  const handleSubmit = async () => {
    const updateFields: Partial<ICreateClienteParams> = {};

    if (nome !== cliente.nome) updateFields.nome = nome;
    if (email !== cliente.email) updateFields.email = email;
    if (telefone !== cliente.telefone) updateFields.telefone = telefone;
    if (empresa && Number(empresa.value) !== cliente.idEmpresa)
      updateFields.idEmpresa = Number(empresa.value);

    if (Object.keys(updateFields).length === 0) {
      setAlertConfig({
        icon: "warning",
        title: "Nenhum campo foi alterado",
      });
      return;
    }

    await update({ id: cliente.idCliente, data: updateFields })
      .then(() => {
        setAlertConfig({
          icon: "success",
          title: "Cliente atualizado com sucesso",
        });
        setTimeout(() => refetch(), 2000);
      })
      .catch((err) => {
        setAlertConfig({
          icon: "warning",
          title:
            err.response.data.message || "Inconsistência ao atualizar cliente",
        });
      })
      .finally(() => setTimeout(() => setAlertConfig(null), 3000));
  };

  useEffect(() => {
    if (cliente.idEmpresa) {
      const find = empresas.find((e) => e.idEmpresa === cliente.idEmpresa);
      if (find) {
        setEmpresa({
          value: String(find.idEmpresa),
          label: find.nomeFantasia,
        });
      }
    }
  }, [cliente, empresas]);

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
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Atualizar"}
      </Button>

      {alertConfig && <ToastAlert {...alertConfig} />}
    </div>
  );
};

export default UpdateForm;
