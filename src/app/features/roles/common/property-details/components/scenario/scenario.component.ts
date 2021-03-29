import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PieChartComponent} from '../../popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {LoanScenarioModel, ViewPaymentBreakDownModel} from '../../models/property-details.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {Subscription} from 'rxjs';
import {CalculatorComponent} from '../../popups/calculator/calculator.component';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loanScenario;
  @Input() scenarioNumber;
  scenario: LoanScenarioModel = {} as LoanScenarioModel;
  pieChart: ViewPaymentBreakDownModel = {} as ViewPaymentBreakDownModel;
  subscription: Subscription;
  constructor(private modalService: NgbModal, configuration: NgbModalConfig, public store: StoreService) {
    configuration.centered = true;
    configuration.container =  'app-property-details';
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.subscription = this.store.toggleLoanType.subscribe(loanType => {
      this.scenario.housingRatio = Number(this.loanScenario.listings[0].financing[loanType].housingRatio ?
          this.loanScenario.listings[0].financing[loanType].housingRatio.toFixed(2) : null);
      this.scenario.debtRatio = Number(this.loanScenario.listings[0].financing[loanType].debtRatio ?
          this.loanScenario.listings[0].financing[loanType].debtRatio.toFixed(2) : null);
      this.scenario.purchasePrice = Math.round(this.loanScenario.listings[0].listPrice);
      this.scenario.loanAmount = Math.round(this.loanScenario.listings[0].financing[loanType].loanAmount);
      this.scenario.financeAmount = Math.round(this.loanScenario.listings[0].financing[loanType].financeAmount);
      this.scenario.downPayment = Math.round(this.loanScenario.listings[0].financing[loanType].downPaymentCalculated);
      this.scenario.loanRate = (this.loanScenario.userLoan[loanType].loanRate);
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  viewPieChart(): void {
    const modalRef = this.modalService.open(PieChartComponent);
    modalRef.componentInstance.breakDown = this.pieChart;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
      }
    }, error => {
      console.log(error);
    });
  }
  viewCalculator(): void {
    const modalRef = this.modalService.open(CalculatorComponent);
    modalRef.componentInstance.calculator = this.loanScenario;
    modalRef.componentInstance.scenarioNumber = this.scenarioNumber;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
      }
    }, error => {
      console.log(error);
    });
  }
}
