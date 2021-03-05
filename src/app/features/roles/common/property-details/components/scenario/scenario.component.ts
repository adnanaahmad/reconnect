import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PieChartComponent} from '../../popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {LoanScenarioModel, ViewPaymentBreakDownModel} from '../../models/property-details.model';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit, OnChanges {
  @Input() loanScenario;
  @Input() scenarioNumber;
  scenario: LoanScenarioModel = {} as LoanScenarioModel;
  pieChart: ViewPaymentBreakDownModel = {} as ViewPaymentBreakDownModel;
  constructor(private modalService: NgbModal, configuration: NgbModalConfig, public store: StoreService) {
    configuration.centered = true;
    configuration.container =  'app-property-details';
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.store.toggleLoanType.subscribe(loanType => {
      this.scenario.housingRatio = Number(this.loanScenario.listings[0].financing[loanType].housingRatio ?
          this.loanScenario.listings[0].financing[loanType].housingRatio.toFixed(2) : null);
      this.scenario.debtRatio = Number(this.loanScenario.listings[0].financing[loanType].debtRatio ?
          this.loanScenario.listings[0].financing[loanType].debtRatio.toFixed(2) : null);
      this.scenario.purchasePrice = Math.round(this.loanScenario.listings[0].listPrice);
      this.scenario.loanAmount = Math.round(this.loanScenario.listings[0].financing[loanType].loanAmount);
      this.scenario.financeAmount = Math.round(this.loanScenario.listings[0].financing[loanType].financeAmount);
      this.scenario.downPayment = Math.round(this.loanScenario.listings[0].financing[loanType].downPaymentCalculated);
      this.scenario.loanRate = Math.round(this.loanScenario.userLoan[loanType].loanRate);
      this.scenario.loanTerm = Math.round(this.loanScenario.userLoan[loanType].loanTerm);
      this.scenario.monthlyPayment = Math.round(this.loanScenario.listings[0].financing[loanType].totalPayment);
      this.scenario.fundsNeeded = this.scenarioNumber === 1 ? Math.round(this.loanScenario.listings[0].financing[loanType].fundsNeeded) :
          Math.round(this.loanScenario.listings[0].financing[loanType].LS2_fundsNeeded);
      this.pieChart.principalAndInterest = Math.round(this.loanScenario.listings[0].financing[loanType].principalAndInterest);
      this.pieChart.insurance = Math.round(this.loanScenario.listings[0].financing[loanType].insurance);
      this.pieChart.taxes = Math.round(this.loanScenario.listings[0].financing[loanType].taxes);
      this.pieChart.mortgageInsurance = Math.round(this.loanScenario.listings[0].financing[loanType].mortgageInsurance);
      this.pieChart.hoa = Math.round(this.loanScenario.listings[0].hoa);
      this.pieChart.totalPayment = Math.round(this.loanScenario.listings[0].financing[loanType].totalPayment);
    });
  }

  view(): void {
    const modalRef = this.modalService.open(PieChartComponent);
    modalRef.componentInstance.breakDown = this.pieChart;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
        //this.calendar.eventCategories.push(result);
      }
    }, error => {
      //console.log(error);
    });
  }
}


/*
 loanScenario.listings[0].financing[store.toggleLoanType | async].housingRatio > loanScenario.userLoan[store.toggleLoanType | async].housingRatio ||
                loanScenario.listings[0].financing[store.toggleLoanType | async].debtRatio > loanScenario.userLoan[store.toggleLoanType | async].debtRatio
 */
