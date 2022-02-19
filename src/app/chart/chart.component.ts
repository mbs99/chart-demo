import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrowserJsPlumbInstance } from '@jsplumb/browser-ui';
import { AnchorLocations } from '@jsplumb/common';
import { EndpointOptions } from '@jsplumb/core';
import { deserialize, serialize } from 'class-transformer';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../local-storage.service';
import { StorageService } from '../storage-service';
import { ChartDto } from './model/chart.dto';
import { ConnectionDto } from './model/connection.dto';
import { EndpointDto } from './model/endpoint.dto';
import { NodeDto } from './model/node.dto';
import { RectDto } from './model/rect.dto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private chartId: string = '';
  private routeSubscription: Subscription;

  chart?: ChartDto;
  exportTrigger: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: LocalStorageService
  ) {
    this.routeSubscription = activatedRoute.params.subscribe((params) => {
      this.chartId = params['id'];

      if (this.chartId) {
        this.loadChart();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit(): void {}

  storeChart(dto: ChartDto) {
    this.storageService.saveChart(dto);
  }

  toggleExportTrigger() {
    this.exportTrigger = !this.exportTrigger;
  }

  loadChart() {
    if ('' !== this.chartId) {
      const storedChart = this.storageService.findChart(this.chartId);
      if (storedChart) {
        this.chart = storedChart;
      }
    }
  }

  createChart() {
    this.chart = new ChartDto(uuidv4().toString(), 'Test', [], []);
  }
}
