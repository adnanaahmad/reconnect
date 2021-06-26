import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoanDetailsModel} from '../../models/loanDetails.model';
import {LoanDetailsService} from '../../services/loan-details.service';
import {ToastrService} from 'ngx-toastr';
import {StoreService} from '../../../../../../core/store/store.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddClosingCostComponent} from '../../../../../../shared/components/add-closing-cost/add-closing-cost.component';

@Component({
  selector: 'app-my-loan-details',
  templateUrl: './my-loan-details.component.html',
  styleUrls: ['./my-loan-details.component.scss']
})
export class MyLoanDetailsComponent implements OnInit, OnDestroy {
  loanDetails: LoanDetailsModel = {} as LoanDetailsModel;
  loader: boolean;
  subscription: Array<Subscription>;
  constructor(private fb: FormBuilder,
              private loadDetailsService: LoanDetailsService,
              private toaster: ToastrService,
              private store: StoreService,
              private helper: HelperService,
              private constant: ConstantService,
              private configuration: NgbModalConfig,
              private modalService: NgbModal) {
    configuration.centered = true;
    configuration.container = 'app-my-loan-details';
  }

  ngOnInit(): void {
    this.subscription = [];
    this.loader = false;
    this.store.updateProgressBarLoading(true);
    this.initializeLoanDetails();
    this.getLoanDetails();
    //this.loanDetails.finance.valueChanges.subscribe(newval => console.log(newval));
    this.resetLoanType();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

  onSubmit(): void{
    console.log(this.loanDetails.finance.value);
    if (this.validateLoanDetails()) {
      const data = {
        fha: this.loanDetails.finance.get(['toggle', 'fha']).value ? this.loanDetails.finance.get('fha').value : null,
        usda: this.loanDetails.finance.get(['toggle', 'usda']).value ? this.loanDetails.finance.get('usda').value : null,
        va: this.loanDetails.finance.get(['toggle', 'va']).value ? this.loanDetails.finance.get('va').value : null,
        homePossible: this.loanDetails.finance.get(['toggle', 'homePossible']).value ?
            this.loanDetails.finance.get('homePossible').value : null,
        homeReady: this.loanDetails.finance.get(['toggle', 'homeReady']).value ? this.loanDetails.finance.get('homeReady').value : null,
        conventional: this.loanDetails.finance.get(['toggle', 'conventional']).value ?
            this.loanDetails.finance.get('conventional').value : null,
      };
      console.log(data);
      this.loadDetailsService.setLoanDetails({...this.loanDetails.finance.value, ...data}).pipe(take(1)).subscribe(res => {
        console.log(res);
        res = res.result;
        this.loanDetails.finance.patchValue({
          income: res.income,
          monthlyDebt: res.monthlyDebt,
          funds: res.funds,
          sellerCredit: res.sellerCredit,
        });
        this.toaster.success('Saved');
      }, error => {
        console.log(error);
        this.toaster.error('Failed To Save');
      });
    } else{
      this.toaster.error('Incomplete Form');
    }

  }
  validateLoanDetails(): boolean{
    let bool = true;
    Object.keys(this.loanDetails.finance.get('toggle').value).forEach(x => {
      if (this.loanDetails.finance.get(['toggle', x]).value){
        if (!this.loanDetails.finance.get(x).valid){
          this.loanDetails.finance.markAllAsTouched();
          bool = false;
        }
      }
    });
    if (this.loanDetails.finance.get('income').invalid || this.loanDetails.finance.get('funds').invalid ||
        this.loanDetails.finance.get('monthlyDebt').invalid || this.loanDetails.finance.get('sellerCredit').invalid){
      this.loanDetails.finance.markAllAsTouched();
      bool = false;
    }
    return bool;
  }
  resetLoanType(): void{
    Object.keys(this.loanDetails.finance.get('toggle').value).forEach(key => {
      this.subscription.push(
          this.loanDetails.finance.get(['toggle', key]).valueChanges.subscribe(res => {
            if (!res){
              this.loanDetails.finance.get(key).reset();
            }
          })
      );
    });
  }
  getLoanDetails(): void{
    this.loadDetailsService.getLoanDetails().pipe(take(1)).subscribe(res => {
      console.log(res);
      res = res.result;
      this.loanDetails.fixedExpenses = res.fixedExpenses;
      this.loanDetails.variableExpenses = res.variableExpenses;
      this.loanDetails.finance.patchValue({
        income: res.income,
        monthlyDebt: res.monthlyDebt,
        funds: res.funds,
        sellerCredit: res.sellerCredit,
        toggle: {
          fha: !!res.fha ,
          conventional: !!res.conventional,
          homePossible: !!res.homePossible,
          homeReady: !!res.homeReady,
          va: !!res.va,
          usda: !!res.usda,
        },
        fha: res.fha ? res.fha : this.loanDetails.finance.get('fha'),
        va: res.va ? res.va : this.loanDetails.finance.get('va'),
        usda: res.usda ? res.usda : this.loanDetails.finance.get('usda'),
        homeReady: res.homeReady ? res.homeReady : this.loanDetails.finance.get('homeReady'),
        homePossible: res.homePossible ? res.homePossible : this.loanDetails.finance.get('homePossible'),
        conventional: res.conventional ? res.conventional : this.loanDetails.finance.get('conventional')
      });
      this.loader = true;
      this.store.updateProgressBarLoading(false);
      if (this.constant.homeBuyingProcessStatusIndex[res.processStatus] >= 2){
        this.loanDetails.finance.disable();
        this.loanDetails.disableSave = true;
      }
      this.loanDetails.processStatus = res.processStatus;
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  initializeLoanDetails(): void{
    this.loanDetails.disableSave = false;
    this.loanDetails.finance = this.fb.group({
      income: [null, Validators.required],
      monthlyDebt: [null, Validators.required],
      funds: [null, Validators.required],
      sellerCredit: [null, Validators.required],
      toggle: this.fb.group({
        fha: [null, Validators.required],
        conventional: [null, Validators.required],
        homePossible: [null, Validators.required],
        homeReady: [null, Validators.required],
        va: [null, Validators.required],
        usda: [null, Validators.required],
      }) ,
      fha: this.fb.group({
        downPayment: [null, Validators.required],
        loanTerm: [null, Validators.required],
        loanRate: [null, Validators.required],
        housingRatio: [null, Validators.required],
        debtRatio: [null, Validators.required],
        mortgageInsuranceUnder: this.fb.group({
          fundingFee: [null, Validators.required],
          monthlyMiUnder: [null, Validators.required],
          monthlyMiOver: [null, Validators.required],
        }),
        mortgageInsuranceAbove: this.fb.group({
          fundingFee: [null, Validators.required],
          monthlyMiUnder: [null, Validators.required],
          monthlyMiOver: [null, Validators.required],
        }),
        reserves: this.fb.group({
          oneUnit: [null, Validators.required],
          twoUnit: [null, Validators.required],
          threeToFourUnit: [null, Validators.required],
        }),
        additionalReserves: [null, Validators.required],
      }),
      conventional: this.fb.group({
        loanTerm: [null, Validators.required],
        loanRate: [null, Validators.required],
        housingRatio: [null, Validators.required],
        debtRatio: [null, Validators.required],
        privateMortgageInsurance: this.fb.group({
          fivePercentDown: [null, Validators.required],
          tenPercentDown: [null, Validators.required],
          fifteenPercentDown: [null, Validators.required],
        }),
        downPayment: this.fb.group({
          oneUnit: [null, [Validators.required, this.helper.downPaymentValidator(5)]],
          twoUnit: [null, [Validators.required, this.helper.downPaymentValidator(5)]],
          threeToFourUnit: [null, [Validators.required, this.helper.downPaymentValidator(5)]],
        }),
        reserves: this.fb.group({
          oneUnit: [null, Validators.required],
          twoUnit: [null, Validators.required],
          threeToFourUnit: [null, Validators.required],
        }),
        additionalReserves: [null, Validators.required],
      }),
      homePossible: this.fb.group({
        loanTerm: [null, Validators.required],
        loanRate: [null, Validators.required],
        downPayment: this.fb.group({
          oneUnit: [null, [Validators.required, this.helper.downPaymentValidator(3)]],
          twoUnit: [null, [Validators.required, this.helper.downPaymentValidator(3)]],
          threeToFourUnit: [null, [Validators.required, this.helper.downPaymentValidator(3)]],
        }),
        housingRatio: [null, Validators.required],
        debtRatio: [null, Validators.required],
        privateMortgageInsurance: this.fb.group({
          threePercentDown: [null, Validators.required],
          fivePercentDown: [null, Validators.required],
          tenPercentDown: [null, Validators.required],
          fifteenPercentDown: [null, Validators.required],
        }),
        reserves: this.fb.group({
          oneUnit: [null, Validators.required],
          twoUnit: [null, Validators.required],
          threeToFourUnit: [null, Validators.required],
        }),
        additionalReserves: [null, Validators.required],
      }),
      homeReady: this.fb.group({
        loanTerm: [null, Validators.required],
        loanRate: [null, Validators.required],
        downPayment: this.fb.group({
          oneUnit: [null, [Validators.required, this.helper.downPaymentValidator(2)]],
          twoUnit: [null, [Validators.required, this.helper.downPaymentValidator(2)]],
          threeToFourUnit: [null, [Validators.required, this.helper.downPaymentValidator(2)]],
        }),
        housingRatio: [null, Validators.required],
        debtRatio: [null, Validators.required],
        privateMortgageInsurance: this.fb.group({
          threePercentDown: [null, Validators.required],
          fivePercentDown: [null, Validators.required],
          tenPercentDown: [null, Validators.required],
          fifteenPercentDown: [null, Validators.required],
        }),
        reserves: this.fb.group({
          oneUnit: [null, Validators.required],
          twoUnit: [null, Validators.required],
          threeToFourUnit: [null, Validators.required],
        }),
        additionalReserves: [null, Validators.required],
      }),
      va: this.fb.group({
        downPayment: [null, Validators.required],
        loanTerm: [null, Validators.required],
        loanRate: [null, Validators.required],
        housingRatio: [null, Validators.required],
        debtRatio: [null, Validators.required],
        veteranType: [null, Validators.required],
        reserves: this.fb.group({
          oneUnit: [null, Validators.required],
          twoUnit: [null, Validators.required],
          threeToFourUnit: [null, Validators.required],
        }),
        additionalReserves: [null, Validators.required],
      }),
      usda: this.fb.group({
        downPayment: [null, Validators.required],
        loanTerm: [null, Validators.required],
        loanRate: [null, Validators.required],
        housingRatio: [null, Validators.required],
        debtRatio: [null, Validators.required],
        mortgageInsurance: this.fb.group({
          fundingFee: [null, Validators.required],
          monthlyMi: [null, Validators.required],
        }),
        reserves: [null, Validators.required],
      })
    });
  }

  addClosingCost(): void{
    const modalRef = this.modalService.open(AddClosingCostComponent,
        {
          container: 'app-my-loan-details',
          ariaLabelledBy: 'modal-basic-title'
        });
    modalRef.componentInstance.variableExpenses = this.loanDetails.variableExpenses;
    modalRef.componentInstance.fixedExpenses = this.loanDetails.fixedExpenses;
    modalRef.componentInstance.processStatus = this.loanDetails.processStatus;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.loanDetails.fixedExpenses = result.data.fixedExpenses;
        this.loanDetails.variableExpenses = result.data.variableExpenses;
      }
    }, error => {
      console.log(error);
    });
  }
}
