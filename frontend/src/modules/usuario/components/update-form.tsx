import { TipoUsuario, Usuario } from "@/domain/usuario/entities/usuario.entity";
import CustomSelect from "@/shared/components/comon/select";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { OptionFormatted } from "@/shared/types/components.types";
import { useEffect, useState } from "react";
import { useUpdateUsuario } from "../hooks/use-usuario";
import { Loader2 } from "lucide-react";
import { ICreateUsuarioParams } from "@/domain/usuario/params/create-usuario.params";
import { ToastAlert } from "@/shared/components/comon/alert";
import { useGetAllEmpresa } from "@/modules/empresa/hooks/use-empresa";

const UpdateUsuario = ({
  usuario,
  refetch,
}: {
  usuario: Usuario;
  refetch: () => void;
}) => {
  const [nome, setNome] = useState<string>(usuario.nome);
  const [email, setEmail] = useState<string>(usuario.email);
  const [empresa, setEmpresa] = useState<OptionFormatted | null>({
    value: String(usuario.idEmpresa),
    label: usuario.empresa.nomeFantasia
  });
  const [tipo, setTipo] = useState<OptionFormatted | null>({
    value: usuario.tipo,
    label: usuario.tipo,
  });
  const [alertConfig, setAlertConfig] = useState<{
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { loading, update } = useUpdateUsuario();
  const { empresa: empresas, loading: loadingEmpresa } = useGetAllEmpresa();

  const handleSubmit = async () => {
    const updateFields: Partial<ICreateUsuarioParams> = {};

    if (nome !== usuario.nome) updateFields.nome = nome;
    if (email !== usuario.email) updateFields.email = email;
    if (tipo && tipo.value !== usuario.tipo)
      updateFields.tipo = tipo.value as TipoUsuario;
    if (empresa && Number(empresa.value) !== usuario.idEmpresa)
      updateFields.idEmpresa = Number(empresa.value);

    if (Object.keys(updateFields).length === 0) {
      setAlertConfig({
        icon: "warning",
        title: "Nenhum campo foi alterado",
      });
      return;
    }

    await update({ id: usuario.idUsuario, data: updateFields })
      .then(() => {
        setAlertConfig({
          icon: "success",
          title: "Usuário atualizado com sucesso",
        });
        setTimeout(() => refetch(), 2000);
      })
      .catch((err) => {
        setAlertConfig({
          icon: "warning",
          title:
            err.response.data.message || "Iconsistência ao atualizar usuário",
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

export default UpdateUsuario;
