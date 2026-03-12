import { useGetAllCliente } from "@/modules/cliente/hooks/use-cliente";
import { useGetAllUsuarios } from "@/modules/usuario/hooks/use-usuario";
import CustomSelect from "@/shared/components/comon/select";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { OptionFormatted } from "@/shared/types/components.types";
import { useEffect, useState } from "react";
import { useCreateChamado } from "../hooks/use-chamado";
import { Loader2 } from "lucide-react";
import { ToastAlert } from "@/shared/components/comon/alert";

const CreateChamado = ({ refetch }: { refetch: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [equipamento, setEquipamento] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [cliente, setCliente] = useState<OptionFormatted | null>(null);
  const [responsavel, setResponsavel] = useState<OptionFormatted | null>(null);
  const [clienteSearch, setClienteSearch] = useState("");
  const [debouncedClienteSearch, setDebouncedClienteSearch] = useState("");
  const [usuarioSearch, setUsuarioSearch] = useState("");
  const [debouncedUsuarioSearch, setDebouncedUsuarioSearch] = useState("");

  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  const { create, loading } = useCreateChamado();
  const { clientes, loading: loadingClientes } = useGetAllCliente({
    nome: debouncedClienteSearch,
  });
  const { usuarios, loading: loadingUsuarios } = useGetAllUsuarios({
    nome: debouncedUsuarioSearch,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedClienteSearch(clienteSearch);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [clienteSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedUsuarioSearch(usuarioSearch);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [usuarioSearch]);

  const handleSubmit = async () => {
    if (!title || !equipamento || !descricao || !cliente) {
      setAlertConfig({
        id: Date.now(),
        icon: "warning",
        title: "Preencha todos os campos obrigatórios",
      });
      return;
    }

    await create({
      data: {
        titulo: title,
        equipamento,
        descricao,
        idCliente: Number(cliente.value),
        idResponsavel: responsavel ? Number(responsavel.value) : null,
      },
    })
      .then(() => {
        setAlertConfig({
          id: Date.now(),
          icon: "success",
          title: "Chamado criado com sucesso",
        });

        setTitle("");
        setEquipamento("");
        setDescricao("");
        setCliente(null);
        setResponsavel(null);
        setTimeout(() => refetch(), 1000);
      })
      .catch(() => {
        setAlertConfig({
          id: Date.now(),
          icon: "error",
          title: "Erro ao criar chamado",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setAlertConfig(null);
        }, 3000);
      });
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div className="grid gap-2 col-span-2">
          <Label>Título*</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid gap-2 col-span-2">
          <Label>Equipamento*</Label>
          <Input
            value={equipamento}
            onChange={(e) => setEquipamento(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Cliente*</Label>
          <CustomSelect
            label="Selecione um Cliente"
            onChange={setCliente}
            options={clientes.map((c) => ({
              value: String(c.idCliente),
              label: c.nome,
            }))}
            value={cliente}
            loading={loadingClientes}
            onSearchInputChange={setClienteSearch}
          />
        </div>
        <div className="grid gap-2">
          <Label>Responsável</Label>
          <CustomSelect
            label="Selecione um Técnico Responsável"
            onChange={setResponsavel}
            options={usuarios.map((c) => ({
              value: String(c.idUsuario),
              label: c.nome,
            }))}
            value={responsavel}
            loading={loadingUsuarios}
            onSearchInputChange={setUsuarioSearch}
          />
        </div>
        <div className="grid gap-2 col-span-2">
          <Label>Descrição*</Label>
          <Textarea
            rows={7}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
      </div>
      <Button className="w-full" disabled={loading} onClick={handleSubmit}>
        {loading ? <Loader2 className="animate-spin" /> : "Salvar"}
      </Button>

      {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
    </div>
  );
};

export default CreateChamado;
