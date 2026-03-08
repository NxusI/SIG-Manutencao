"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { BarChart as TypeData } from "@/domain/dashboard/entities/bar-chart.entity";
import { Skeleton } from "@/shared/components/ui/skeleton";

const chartConfig = {
  quantidadeChamados: {
    label: "Chamados",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarTecnicos({
  data,
  error,
  loading,
}: {
  data: TypeData[];
  error: string;
  loading: boolean;
}) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chamados por Técnico</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="tecnico"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar
              dataKey="quantidadeChamados"
              fill="var(--color-quantidadeChamados)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
