import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.scss']
})
export class BuyerInfoComponent implements OnInit {
  @Input() transactionDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
