import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ViewPaymentBreakDownModel} from '../../models/property-details.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() breakDown: ViewPaymentBreakDownModel = {} as ViewPaymentBreakDownModel;
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
        name: 'Principal and Interest',
        value: this.breakDown.principalAndInterest
      },
      {
        name: 'Insurance',
        value: this.breakDown.insurance
      },
      {
        name: 'Taxes',
        value: this.breakDown.taxes
      },
      {
        name: 'Mortgage Insurance',
        value: this.breakDown.mortgageInsurance
      },
      {
        name: 'HOA',
        value: this.breakDown.hoa
      },

    ];
    this.view = [innerWidth / 5, innerWidth / 8.5];
  }

}
