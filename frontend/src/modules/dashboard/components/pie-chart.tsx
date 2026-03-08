"use client"

import { Pie, PieChart, Cell, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart"
import { PieChart as TypeData } from "@/domain/dashboard/entities/pie-chart"

const chartConfig = {
  quantidadeChamados: {
    label: "Chamados",
  },
} satisfies ChartConfig

const COLORS = [
  "var(--chart-1)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function ChartPieStatus({
  data,
  error,
  loading,
}: {
  data: TypeData[]
  loading: boolean
  error: string
}) {
  if (loading) {
    return <div>Carregando gráfico...</div>
  }

  if (error) {
    return <div>Erro ao carregar gráfico</div>
  }

  if (!data || data.length === 0) {
    return <div>Sem dados para exibir</div>
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Chamados por Status</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-[320px] h-[320px]"
        >
          <PieChart width={320} height={320}>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={data}
              dataKey="quantidadeChamados"
              nameKey="status"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.status}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}