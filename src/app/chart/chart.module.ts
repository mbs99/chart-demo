import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { ChartComponent } from './chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DomChangeDirective } from './dom-change.directive';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ChartComponent,
    ChartViewComponent,
    DomChangeDirective,
    ConnectionSettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  exports: [ChartComponent],
})
export class ChartModule {}
