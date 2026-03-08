import { AreaChart } from "../entities/area-chart.entity";
import { BarChart } from "../entities/bar-chart.entity";
import { Cards } from "../entities/cards.entity";
import { PieChart } from "../entities/pie-chart";
import { IDashboardParams } from "../params/dashboard-params.params";

export interface IDashboaardRepository {
  pieChart(params: IDashboardParams): Promise<PieChart[]>;
  areaChart(params: IDashboardParams): Promise<AreaChart[]>;
  barChart(params: IDashboardParams): Promise<BarChart[]>;
  getCards(params: IDashboardParams): Promise<Cards>;
}  
