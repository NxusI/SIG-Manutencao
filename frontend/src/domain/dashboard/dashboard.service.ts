import { DashboardRepository } from "./dashboard.repository";
import { AreaChart } from "./entities/area-chart.entity";
import { BarChart } from "./entities/bar-chart.entity";
import { Cards } from "./entities/cards.entity";
import { PieChart } from "./entities/pie-chart";
import { IDashboardParams } from "./params/dashboard-params.params";

export class DashboardService {
  private readonly repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  async pieChart(params: IDashboardParams): Promise<PieChart[]> {
    return this.repository.pieChart(params);
  }

  async areaChart(params: IDashboardParams): Promise<AreaChart[]> {
    return this.repository.areaChart(params);
  }

  async barChart(params: IDashboardParams): Promise<BarChart[]> {
    return this.repository.barChart(params);
  }

  async getCards(params: IDashboardParams): Promise<Cards> {
    return this.repository.getCards(params);
  }
}
