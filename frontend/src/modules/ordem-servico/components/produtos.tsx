import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { formatCurrency } from "@/utils/formatters";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Produto = {
  produto: string;
  quantidade: number;
  valorUnitario: number;
};

const parseCurrency = (value: string): number => {
  return Number(value.replace(/\D/g, "").replace(/(\d{2})$/, ".$1"));
};

const ProdutosOrdem = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Produto>({
    produto: "",
    quantidade: 1,
    valorUnitario: 0,
  });

  const handleAddProduto = () => {
    if (!novoProduto.produto || novoProduto.valorUnitario <= 0) return;

    setProdutos((prev) => [...prev, novoProduto]);
    setNovoProduto({
      produto: "",
      quantidade: 1,
      valorUnitario: 0,
    });
  };

  const handleRemoveProduto = (index: number) => {
    setProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid gap-5 border border-border p-3 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-2 items-end">
        <div className="grid gap-2 w-full">
          <Label>Produto*</Label>
          <Input
            value={novoProduto.produto}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, produto: e.target.value })
            }
            placeholder="Descrição do produto"
          />
        </div>

        <div className="grid gap-2 w-full lg:max-w-[150px]">
          <Label>Quantidade*</Label>
          <Input
            type="number"
            min={1}
            value={novoProduto.quantidade}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                quantidade: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="grid gap-2 w-full">
          <Label>Valor Unitário*</Label>
          <Input
            inputMode="numeric"
            value={formatCurrency(novoProduto.valorUnitario)}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                valorUnitario: parseCurrency(e.target.value),
              })
            }
            placeholder="R$ 0,00"
          />
        </div>

        <Button size="icon" onClick={handleAddProduto}>
          <Plus />
        </Button>
      </div>

      {produtos.map((produto, index) => (
        <div key={index} className="flex flex-col lg:flex-row gap-2 items-end">
          <div className="grid gap-2 w-full">
            <Label>Produto</Label>
            <Input value={produto.produto} disabled />
          </div>

          <div className="grid gap-2 w-full lg:max-w-[150px]">
            <Label>Quantidade</Label>
            <Input value={produto.quantidade} disabled />
          </div>

          <div className="grid gap-2 w-full">
            <Label>Valor Unitário</Label>
            <Input value={formatCurrency(produto.valorUnitario)} disabled />
          </div>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => handleRemoveProduto(index)}
          >
            <Trash2 />
          </Button>
        </div>
      ))}

      {produtos.length > 0 && (
        <div className="flex justify-end gap-5">
          <strong>TOTAL</strong>
          <span>
            {formatCurrency(
              produtos.reduce(
                (acc, produto) =>
                  acc + produto.quantidade * produto.valorUnitario,
                0,
              ),
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProdutosOrdem;
