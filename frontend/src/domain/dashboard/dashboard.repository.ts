import { apiClient } from "@/infraestructure/api/api-client";
import { IDashboaardRepository } from "./contracts/dashboard-repository.interface";
import { PieChart } from "./entities/pie-chart";
import { IDashboardParams } from "./params/dashboard-params.params";
import { BarChart } from "./entities/bar-chart.entity";
import { AreaChart } from "./entities/area-chart.entity";
import { Cards } from "./entities/cards.entity";

export class DashboardRepository implements IDashboaardRepository {
  async pieChart(params: IDashboardParams): Promise<PieChart[]> {
    const res = await apiClient.get(`dashboard/pizza`, {
      params,
    });
    return res.data.data;
  }

  async barChart(params: IDashboardParams): Promise<BarChart[]> {
    const res = await apiClient.get(`dashboard/barra`, {
      params,
    });
    return res.data.data;
  }

  async areaChart(params: IDashboardParams): Promise<AreaChart[]> {
    const res = await apiClient.get(`dashboard/area`, {
      params,
    });
    return res.data.data;
  }

  async getCards(params: IDashboardParams): Promise<Cards> {
    const res = await apiClient.get(`dashboard/cards`, {
      params,
    });
    return res.data;
  }
}
