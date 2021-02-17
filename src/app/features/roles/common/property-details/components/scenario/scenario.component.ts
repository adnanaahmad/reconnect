import {Component, Input, OnInit} from '@angular/core';
import {PieChartComponent} from '../../popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {LoanScenarioModel, ViewPaymentBreakDownModel} from '../../models/property-details.model';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  @Input() loanScenario;
  @Input() scenarioNumber;
  scenario: LoanScenarioModel = {} as LoanScenarioModel;
  pieChart: ViewPaymentBreakDownModel = {} as ViewPaymentBreakDownModel;
  constructor(private modalService: NgbModal, configuration: NgbModalConfig) {
    configuration.centered = true;
    configuration.container =  'app-property-details';
  }

  ngOnInit(): void {
    //console.log(this.loanScenario);
    this.scenario.purchasePrice = Math.round(this.loanScenario.listings[0].listPrice);
    this.scenario.loanAmount = Math.round(this.loanScenario.listings[0].financing.fha.loanAmount);
    this.scenario.financeAmount = Math.round(this.loanScenario.listings[0].financing.fha.financeAmount);
    this.scenario.downPayment = Math.round(this.loanScenario.listings[0].financing.fha.downPaymentCalculated);
    this.scenario.loanRate = Math.round(this.loanScenario.userLoan.fha.loanRate);
    this.scenario.loanTerm = Math.round(this.loanScenario.userLoan.fha.loanTerm);
    this.scenario.monthlyPayment = Math.round(this.loanScenario.listings[0].financing.fha.totalPayment);
    this.scenario.fundsNeeded = this.scenarioNumber === 1 ? Math.round(this.loanScenario.listings[0].financing.fha.fundsNeeded) :
        Math.round(this.loanScenario.listings[0].financing.fha.LS2_fundsNeeded);
    this.pieChart.principalAndInterest = Math.round(this.loanScenario.listings[0].financing.fha.principalAndInterest);
    this.pieChart.insurance = Math.round(this.loanScenario.listings[0].financing.fha.insurance);
    this.pieChart.taxes = Math.round(this.loanScenario.listings[0].financing.fha.taxes);
    this.pieChart.mortgageInsurance = Math.round(this.loanScenario.listings[0].financing.fha.mortgageInsurance);
    this.pieChart.hoa = Math.round(this.loanScenario.listings[0].hoa);
    this.pieChart.totalPayment = Math.round(this.loanScenario.listings[0].financing.fha.totalPayment);
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
