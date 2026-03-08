import { OrdemServico } from "@/domain/ordem-servico/entities/ordem-servico.entity";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";

const Infor = ({ os }: { os: OrdemServico }) => {
  return (
    <div className="grid gap-3">
      {os.itens.map((o, i) => (
        <div className="flex flex-row gap-2" key={i}>
          <div className="grid gap-2">
            <Label>Produto</Label>
            <Input readOnly value={o.produto.descricao} />
          </div>
          <div className="grid gap-2">
            <Label>Quantidade</Label>
            <Input readOnly value={o.quantidade} />
          </div>
          <div className="grid gap-2">
            <Label>Valor</Label>
            <Input readOnly value={formatCurrency(o.produto.preco)} />
          </div>
        </div>
      ))}
      <Textarea value={os.obs} readOnly />
      <div className="flex justify-between mt-2">
        <span>Valor Cobrado</span>
        <span>{formatCurrency(os.valor - (os.itens.map((i) => i.produto.preco).reduce((a, b) => a + b, 0)))}</span>
      </div>
      <Separator/>
      {/* <div className="flex justify-between mb-[-10]">
        <strong>TOTAL</strong>
        <span>{formatCurrency(os.valor)}</span>
      </div> */}
    </div>
  );
};

export default Infor;
