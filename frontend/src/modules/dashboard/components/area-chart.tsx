"use client";

import { AreaChart as TypeData } from "@/domain/dashboard/entities/area-chart.entity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { formatCurrency } from "@/utils/formatters";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  ValorTotalProdutos: {
    label: "Custo Produtos",
    color: "var(--chart-4)",
  },
  LucroLiquido: {
    label: "Lucro Líquido",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  data,
  error,
  loading,
}: {
  data: TypeData[];
  loading: boolean;
  error: string;
}) {
  if (loading) {
    return <div>Carregando gráfico...</div>;
  }

  if (error) {
    return <div>Erro ao carregar gráfico</div>;
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle>Custos X Lucros</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillCusto" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ValorTotalProdutos)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ValorTotalProdutos)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillLucro" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-LucroLiquido)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-LucroLiquido)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [dia, mes] = value.split("/");
                return `${dia}/${mes}`;
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => value}
                  formatter={(value, name) => {
                    const label =
                      name === "LucroLiquido"
                        ? "Lucro"
                        : name === "ValorTotalProdutos"
                          ? "Custo"
                          : name;

                    return [
                      <span>
                        <strong>{label}:</strong>{" "}
                        {formatCurrency(Number(value))}
                      </span>,
                      "",
                    ];
                  }}
                />
              }
            />

            <Area
              dataKey="LucroLiquido"
              type="natural"
              fill="url(#fillLucro)"
              stroke="var(--color-LucroLiquido)"
            />

            <Area
              dataKey="ValorTotalProdutos"
              type="natural"
              fill="url(#fillCusto)"
              stroke="var(--color-ValorTotalProdutos)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
