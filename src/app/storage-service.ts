import { ChartDto } from './chart/model/chart.dto';

export interface StorageService {
  saveChart(chart: ChartDto): void;

  findChart(id: string): ChartDto | null;
}
