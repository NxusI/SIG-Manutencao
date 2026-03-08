import { Cards } from "@/domain/dashboard/entities/cards.entity";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatCurrency } from "@/utils/formatters";
import {
  CircleCheck,
  HandCoins,
  TriangleAlert,
  Wallet,
  XCircle,
} from "lucide-react";

const CardsDash = ({
  data,
  loading,
  error,
}: {
  data: Cards | null;
  loading: boolean;
  error: string;
}) => {
  if (!data) {
    return (
      <div className="text-center text-lg text-muted-foreground">
        Nenhum dado encontrado!
      </div>
    );
  }

  if (loading) {
    return (
      <Skeleton className="w-full h-50 bg-muted-foreground animate-pulse" />
    );
  }

  if (error) {
    return (
      <div className="text-lg text-center text-yellow-600">
        {error || "Houve uma inconsistência ao buscar dados do gráfico"}
      </div>
    );
  }

  const dados = [
    {
      label: "Chamados Pendentes",
      value: data.pendentes,
      color: "text-yellow-600",
      icon: TriangleAlert,
    },
    {
      label: "Chamados Finalizados",
      value: data.finalizados,
      color: "text-green-600",
      icon: CircleCheck,
    },
    {
      label: "Chamados Cancelados",
      value: data.cancelados,
      color: "text-red-600",
      icon: XCircle,
    },
    {
      label: "Custo Total",
      value: formatCurrency(data.custo),
      color: "text-orange-600",
      icon: Wallet,
    },
    {
      label: "Lucro Total",
      value: formatCurrency(data.lucro),
      color: "text-blue-700",
      icon: HandCoins,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {dados.map((d, index) => {
        const Icon = d.icon;

        return (
          <div
            key={d.label ?? index}
            className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border w-full bg-card"
          >
            <div className="grid gap-1">
              <strong className={`text-xs text-muted-foreground`}>
                {d.label}
              </strong>
              <span className={`text-xl font-semibold ${d.color}`}>
                {d.value}
              </span>
            </div>

            <Icon className={d.color} size={30} />
          </div>
        );
      })}
    </div>
  );
};

export default CardsDash;
