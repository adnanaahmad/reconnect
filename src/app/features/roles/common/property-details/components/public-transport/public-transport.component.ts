import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-public-transport',
  templateUrl: './public-transport.component.html',
  styleUrls: ['./public-transport.component.scss']
})
export class PublicTransportComponent implements OnInit, AfterViewInit {
  @Input() publicTransport;
  // single: any[] =  [
  //   {
  //     name: 'Green',
  //     value: 64
  //   },
  //   {
  //     name: 'Gray',
  //     value: 36
  //   },
  // ];
  // view: any[];
  // gradient: boolean = false;
  //
  // colorScheme = {
  //   domain: ['#53E773', '#E7EDF8']
  // };
  constructor() { }

  ngOnInit(): void {
    this.publicTransport.view = [innerWidth / 3.5, innerWidth / 6];
  }
  ngAfterViewInit(): void {
    const pieChartArray = document.getElementsByClassName('pie chart');
    pieChartArray[pieChartArray.length - 2].classList.add('odd');
    pieChartArray[pieChartArray.length - 1].classList.add('even');
  }

  onResize(event) {
    this.publicTransport.view = [event.target.innerWidth / 3.5, event.target.innerWidth / 6 ];
  }
}
