import { Component, OnInit } from '@angular/core';
export let single = [
  {
    name: 'Germany',
    value: 8940000
  },
  {
    name: 'USA',
    value: 5000000
  },
  {
    name: 'France',
    value: 7200000
  },
  {
    name: 'UK',
    value: 6200000
  }
];
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  gradient = false;

  view2: any[];
  single: any[];

  colorScheme2 = {
    domain: ['#E7C453', '#53E773', '#E75353', '#7F53E7', '#B3B7C0']
  };

  constructor() { }

  ngOnInit(): void {
    this.single = single;
    this.view2 = [innerWidth / 2.2, innerWidth / 5];
  }
  onResize2(event): void {
    // console.log(event.target.innerWidth);
    this.view2 = [event.target.innerWidth / 2.2, event.target.innerWidth / 5 ];
  }
}
