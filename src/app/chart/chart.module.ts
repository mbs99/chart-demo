import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { ChartComponent } from './chart.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChartComponent, ChartViewComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ChartComponent],
})
export class ChartModule {}
