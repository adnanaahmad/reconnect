import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PersonalSalesAnalyticsModel} from '../../models/dashboard.model';

@Component({
  selector: 'app-personal-sales',
  templateUrl: './personal-sales.component.html',
  styleUrls: ['./personal-sales.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PersonalSalesComponent implements OnInit {
  @Input() salesType;
  @Input() personalSalesAnalytics: PersonalSalesAnalyticsModel;
  single: any[];
  view: any[];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';

  colorScheme = {
    domain: ['#FCF37E', '#A0F68B', '#F5B887', '#AF9CF9']
  };

  constructor() {}
  ngOnInit(): void {
    this.single = [
      {
        name: 'Pending Deals',
        value: this.personalSalesAnalytics.dealsPending
      },
      {
        name: 'Deals Closed',
        value: this.personalSalesAnalytics.dealsClosed
      },
      {
        name: 'Cancelled Deals',
        value: this.personalSalesAnalytics.canceledDeals
      },
      {
        name: 'Pre-Approved Deals',
        value: this.personalSalesAnalytics.preApprovalDeals
      }
    ];
    this.view = [innerWidth / 5, innerWidth / 7.8];
    // console.log('check 123' , this.salesType);
    // if (this.salesType === 'Personal'){
    //   // Fetch Personal Data
    // } else{
    //   // Fetch Dynasty Data
    // }
  }
  onResize(event) {
    //console.log(event.target.innerWidth);
    this.view = [event.target.innerWidth / 5, event.target.innerWidth / 7.8 ];
  }
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
