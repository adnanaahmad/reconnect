import { Component, OnInit } from '@angular/core';
export let multi = [
  {
    name: '2000',
    series: [
      {
        name: 'Principal',
        value: 5300000
      },
      {
        name: 'Extra Payments',
        value: 3040000
      },
      {
        name: 'Interest',
        value: 2000000
      },
      {
        name: 'Taxes, MIP, Insurance & Fees',
        value: 4940000
      }
    ]
  },
  {
    name: '2001',
    series: [
      {
        name: 'Principal',
        value: 5300000
      },
      {
        name: 'Extra Payments',
        value: 3940000
      },
      {
        name: 'Interest',
        value: 4300000
      },
      {
        name: 'Taxes, MIP, Insurance & Fees',
        value: 2940000
      }
    ]
  },
  {
    name: '2002',
    series: [
      {
        name: 'Principal',
        value: 7300000
      },
      {
        name: 'Extra Payments',
        value: 8940000
      },
      {
        name: 'Interest',
        value: 7300000
      },
      {
        name: 'Taxes, MIP, Insurance & Fees',
        value: 8940000
      }
    ]
  },
  {
    name: '2003',
    series: [
      {
        name: 'Principal',
        value: 6300000
      },
      {
        name: 'Extra Payments',
        value: 4940000
      },
      {
        name: 'Interest',
        value: 5300000
      },
      {
        name: 'Taxes, MIP, Insurance & Fees',
        value: 4940000
      }
    ]
  },
  {
    name: '2004',
    series: [
      {
        name: 'Principal',
        value: 7300000
      },
      {
        name: 'Extra Payments',
        value: 1440000
      },
      {
        name: 'Interest',
        value: 4300000
      },
      {
        name: 'Taxes, MIP, Insurance & Fees',
        value: 2040000
      }
    ]
  }
];
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  multi: any[];
  view: any[];
  legendPosition = 'below';


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  animations = true;

  colorScheme = {
    domain: ['#E7C453', '#53E773', '#E75353', '#7F53E7']
  };
  constructor() { }

  ngOnInit(): void {
    this.multi = multi;
    this.view = [innerWidth / 2.2, innerWidth / 5.8];
  }
  onResize(event): void {
    // console.log(event.target.innerWidth);
    this.view = [event.target.innerWidth / 2.2, event.target.innerWidth / 5.8 ];
  }

}
