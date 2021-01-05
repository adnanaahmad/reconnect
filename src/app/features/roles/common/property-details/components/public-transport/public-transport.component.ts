import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-public-transport',
  templateUrl: './public-transport.component.html',
  styleUrls: ['./public-transport.component.scss']
})
export class PublicTransportComponent implements OnInit {
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

  onResize(event) {
    this.publicTransport.view = [event.target.innerWidth / 3.5, event.target.innerWidth / 6 ];
  }
}
