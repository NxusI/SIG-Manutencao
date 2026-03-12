import DatePicker from "@/shared/components/comon/date-picker";
import CustomSelect from "@/shared/components/comon/select";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { OptionFormatted } from "@/shared/types/components.types";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import ProdutosOrdem, { ProdutoOS } from "./produtos";
import { useGetAllChamados } from "@/modules/chamados/hooks/use-chamado";
import { useCreateOrdem } from "../hooks/use-ordem-servico";
import { ToastAlert } from "@/shared/components/comon/alert";

const formatMoney = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const parseMoney = (value: string): number =>
  Number(value.replace(/\D/g, "")) / 100;

const CreateOS = ({ refetch }: { refetch: () => void }) => {
  const [chamado, setChamado] = useState<OptionFormatted | null>(null);
  const [produtos, setProdutos] = useState<ProdutoOS[]>([]);
  const [dataPrazo, setDataPrazo] = useState<Date | undefined>();
  const [valorServico, setValorServico] = useState<number>(0);
  const [observacao, setObservacao] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { chamados } = useGetAllChamados({
    titulo: debouncedSearch,
  });
  const { create, loading } = useCreateOrdem();

  const [alertConfig, setAlertConfig] = useState<{
    id: number;
    icon: "success" | "error" | "warning" | "info";
    title: string;
  } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSubmit = async () => {
    if (!chamado || !dataPrazo) return;

    await create({
      data: {
        idChamado: Number(chamado.value),
        dataPrazo: dataPrazo,
        maoDeObra: valorServico,
        obs: observacao,
        produtos: produtos.map((p) => ({
          nome: p.produto,
          quantidade: p.quantidade,
          preco: p.valorUnitario,
        })),
      },
    })
      .then(() => {
        setAlertConfig({
          id: Date.now(),
          icon: "success",
          title: "Ordem de Serviço criada com sucesso!",
        });
        setTimeout(() => {
          refetch();
        }, 1000);

        setChamado(null);
        setDataPrazo(undefined);
        setProdutos([]);
        setObservacao("");
        setValorServico(0);
      })
      .catch((err) => {
        setAlertConfig({
          id: Date.now(),
          icon: "error",
          title: err.response.data.message || "Erro ao criar ordem de serviço",
        });
      })
      .finally(() => setTimeout(() => setAlertConfig(null), 1000));
  };

  const handledata = (data: Date | undefined | string) => {
    setDataPrazo(data as Date);
  };

  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <Label>Chamado*</Label>
        <CustomSelect
          label="Selecione um chamado"
          options={chamados.map((c) => ({
            value: String(c.idChamado),
            label: c.titulo,
          }))}
          value={chamado}
          onChange={setChamado}
          onSearchInputChange={setSearch}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label>Data Prazo*</Label>
          <DatePicker value={dataPrazo} onChange={handledata} />
        </div>

        <div className="grid gap-2">
          <Label>Valor Total Cobrado*</Label>
          <Input
            value={formatMoney(valorServico)}
            onChange={(e) => setValorServico(parseMoney(e.target.value))}
            placeholder="R$ 0,00"
          />
        </div>
      </div>

      <ProdutosOrdem produtos={produtos} onChange={setProdutos} />

      <div className="grid gap-2">
        <Label>Observação</Label>
        <Textarea
          rows={4}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        Salvar
      </Button>

      {alertConfig && <ToastAlert key={alertConfig.id} {...alertConfig} />}
    </div>
  );
};

export default CreateOS;
