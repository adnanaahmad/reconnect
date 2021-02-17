import {Component, Input, OnInit} from '@angular/core';
import {PieChartComponent} from '../../popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {LoanScenarioModel} from '../../models/property-details.model';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  @Input() loanScenario;
  @Input() scenarioNumber;
  scenario: LoanScenarioModel = {} as LoanScenarioModel;
  constructor(private modalService: NgbModal, configuration: NgbModalConfig) {
    configuration.centered = true;
    configuration.container =  'app-property-details';
  }

  ngOnInit(): void {
    //console.log(this.loanScenario);
    this.scenario.purchasePrice = this.loanScenario.listings[0].listPrice;
    this.scenario.loanAmount = this.loanScenario.listings[0].financing.fha.loanAmount;
    this.scenario.financeAmount = this.loanScenario.listings[0].financing.fha.financeAmount;
    this.scenario.downPayment = this.loanScenario.listings[0].financing.fha.downPaymentCalculated;
    this.scenario.loanRate = this.loanScenario.userLoan.fha.loanRate;
    this.scenario.loanTerm = this.loanScenario.userLoan.fha.loanTerm;
    this.scenario.monthlyPayment = this.loanScenario.listings[0].financing.fha.totalPayment;
    this.scenario.fundsNeeded = this.scenarioNumber === 1 ? this.loanScenario.listings[0].financing.fha.fundsNeeded :
        this.loanScenario.listings[0].financing.fha.LS2_fundsNeeded;
  }
  view(): void {
    const modalRef = this.modalService.open(PieChartComponent);
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
