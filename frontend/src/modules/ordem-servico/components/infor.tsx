import { OrdemServico } from "@/domain/ordem-servico/entities/ordem-servico.entity";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";

const Infor = ({ os }: { os: OrdemServico }) => {
  return (
    <div className="grid gap-3">
      {os.itens.map((o, i) => (
        <div className="flex flex-row gap-2" key={i}>
          <Input readOnly value={o.produto.descricao}/>
          <Input readOnly value={o.quantidade}/>
          <Input readOnly value={formatCurrency(o.produto.preco)}/>
        </div>
      ))}
      <Textarea value={os.obs} readOnly />
    </div>
  );
};

export default Infor;
