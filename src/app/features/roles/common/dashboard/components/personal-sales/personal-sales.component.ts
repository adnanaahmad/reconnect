import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-personal-sales',
  templateUrl: './personal-sales.component.html',
  styleUrls: ['./personal-sales.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PersonalSalesComponent implements OnInit {

  @Input() salesType;
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

  constructor() {
    this.single = [
      {
        name: 'Pending Deals',
        value: 89
      },
      {
        name: 'Deals Closed',
        value: 100
      },
      {
        name: 'Cancelled Deals',
        value: 32
      },
      {
        name: 'Pre-Approved Deals',
        value: 72
      }
    ];
    this.view = [innerWidth / 5, innerWidth / 7.8];
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
  personal(val): void{
    //console.log(val);
    if (this.salesType === 'Personal'){
      // Fetch Personal Data
      console.log('personal ', val);
    } else{
      // Fetch Dynasty Data
      console.log('dynasty ', val);
    }
  }


  ngOnInit(): void {
    console.log('check 123' , this.salesType);
    if (this.salesType === 'Personal'){
      // Fetch Personal Data
    } else{
      // Fetch Dynasty Data
    }
  }

}
