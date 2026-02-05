import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export type ProdutoOS = {
  produto: string;
  quantidade: number;
  valorUnitario: number; // 👈 NUMBER
};

/* ======================
   Utils locais (isolados)
====================== */

const formatMoney = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const parseMoney = (value: string): number => {
  if (!value) return 0;
  return Number(value.replace(/\D/g, "")) / 100;
};

/* ====================== */

const ProdutosOrdem = ({
  produtos,
  onChange,
}: {
  produtos: ProdutoOS[];
  onChange: (produtos: ProdutoOS[]) => void;
}) => {
  const [novoProduto, setNovoProduto] = useState<ProdutoOS>({
    produto: "",
    quantidade: 1,
    valorUnitario: 0,
  });

  const handleAddProduto = () => {
    if (!novoProduto.produto || novoProduto.valorUnitario <= 0) return;

    onChange([...produtos, novoProduto]);

    setNovoProduto({
      produto: "",
      quantidade: 1,
      valorUnitario: 0,
    });
  };

  const handleRemoveProduto = (index: number) => {
    onChange(produtos.filter((_, i) => i !== index));
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
            value={formatMoney(novoProduto.valorUnitario)}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                valorUnitario: parseMoney(e.target.value),
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
        <div
          key={index}
          className="flex flex-col lg:flex-row gap-2 items-end"
        >
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
            <Input value={formatMoney(produto.valorUnitario)} disabled />
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
            {formatMoney(
              produtos.reduce(
                (acc, p) => acc + p.quantidade * p.valorUnitario,
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
