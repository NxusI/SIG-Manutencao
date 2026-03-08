import { formatCurrency } from "@/utils/formatters";
import {
  CircleCheck,
  HandCoins,
  TriangleAlert,
  Wallet,
  XCircle,
} from "lucide-react";

const CardsDash = () => {
  const data = [
    {
      label: "Chamados Pendentes",
      value: 564,
      color: "text-yellow-600",
      icon: TriangleAlert,
    },
    {
      label: "Chamados Finalizados",
      value: 564,
      color: "text-green-600",
      icon: CircleCheck,
    },
    {
      label: "Chamados Cancelados",
      value: 564,
      color: "text-red-600",
      icon: XCircle,
    },
    {
      label: "Custo Total",
      value: formatCurrency(564),
      color: "text-orange-600",
      icon: Wallet,
    },
    {
      label: "Lucro Total",
      value: formatCurrency(564),
      color: "text-blue-700",
      icon: HandCoins,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {data.map((d, index) => {
        const Icon = d.icon;

        return (
          <div
            key={d.label ?? index}
            className="flex items-center justify-between gap-2 p-3 rounded-lg border border-border w-full bg-card"
          >
            <div className="grid gap-1">
              <strong className={`text-xs text-muted-foreground`}>{d.label}</strong>
              <span className={`text-xl font-semibold ${d.color}`}>{d.value}</span>
            </div>

            <Icon className={d.color} size={30} />
          </div>
        );
      })}
    </div>
  );
};

export default CardsDash;
