import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {SharedModule} from '../../../../shared/shared.module';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';


@NgModule({
  declarations: [CalculatorComponent, BarChartComponent, PieChartComponent],
  imports: [
    CommonModule,
    CalculatorRoutingModule,
    SharedModule
  ]
})
export class CalculatorModule { }
