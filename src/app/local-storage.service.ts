import { Injectable } from '@angular/core';
import { deserializeArray, serialize } from 'class-transformer';
import { ChartDto } from './chart/model/chart.dto';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  saveChart(chartDto: ChartDto): void {
    const rawCharts = this.storage.getItem('charts');
    let charts: ChartDto[] = [];
    if (rawCharts) {
      charts = deserializeArray(ChartDto, rawCharts);
      charts = charts.filter((chart) => chart.title !== chartDto.title);
      charts.push(chartDto);
    } else {
      charts.push(chartDto);
    }

    this.storage.setItem('charts', serialize(charts).toString());
  }

  findChart(id: string): ChartDto | null {
    const rawCharts = this.storage.getItem('charts');
    if (rawCharts) {
      let charts: ChartDto[] = deserializeArray(ChartDto, rawCharts);
      charts = charts.filter((chart) => chart.title === id);

      return charts.length > 0 ? charts[0] : null;
    }

    return null;
  }
}
