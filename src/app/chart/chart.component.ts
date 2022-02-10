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
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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

  constructor(private avtivatedRoute: ActivatedRoute) {
    this.routeSubscription = avtivatedRoute.params.subscribe((params) => {
      this.chartId = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit(): void {}
}
