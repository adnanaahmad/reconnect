import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  single: any[];
  view: any[];

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';

  colorScheme = {
    domain: ['#FCCE38', '#53E773', '#F34949', '#69CFFC', '#9D7BEC']
  };
  constructor(private helper: HelperService) {}
  onResize(event) {
    //console.log(event.target.innerWidth);
    this.view = [event.target.innerWidth / 5, event.target.innerWidth / 8.5 ];
  }
  ngOnInit(): void {
    this.helper.setModalPosition();
    this.single = [
      {
        name: 'Down Payment',
        value: 89
      },
      {
        name: 'Principal',
        value: 100
      },
      {
        name: 'Extra Payments',
        value: 32
      },
      {
        name: 'Interest',
        value: 62
      },
      {
        name: 'Taxes',
        value: 12
      }
    ];
    this.view = [innerWidth / 5, innerWidth / 8.5];
  }

}
