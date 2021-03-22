import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoanDetailsModel} from '../../../../buyer/my-loan-details/models/loanDetails.model';
import {FormBuilder, Validators} from '@angular/forms';
import {TransactionDetailsModel} from '../../models/transactionDetails.model';
import {BorrowerLoanDetailsService} from '../../services/borrower-loan-details.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';
import {log} from 'util';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, Location} from '@angular/common';
import {NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
  transactionDetails: TransactionDetailsModel = {} as TransactionDetailsModel;
  subscription: Array<Subscription>;
  constructor(private fb: FormBuilder,
              private transactionService: BorrowerLoanDetailsService,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService,
              public location: Location,
              private dateFormat: NgbDateNativeAdapter,
              private helper: HelperService,
              private constant: ConstantService) {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.transactionDetails.id = routeParams.get('id');
  }

  ngOnInit(): void {
    this.subscription = [];
    this.initializeForm();
    this.transactionDetails.loader = false;
    this.getLoanDetails();
    this.resetLoanType();
    //this.transactionDetails.finance.valueChanges.subscribe(newval => console.log(newval));
  }
  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

  onSubmit(): void{
    if (this.validateLoanDetails()){
      const data = {
        lockExpiryDate: this.transactionDetails.finance.get('lockExpiryDate').value ?
            new Date(new DatePipe('en-US').transform(this.dateFormat.toModel(this.transactionDetails.finance.get('lockExpiryDate').value), 'yyyy-MM-dd')).toISOString() : null,
        borrowerId: this.transactionDetails.id,
        fha: this.transactionDetails.finance.get(['toggle', 'fha']).value ? this.transactionDetails.finance.get('fha').value : null,
        usda: this.transactionDetails.finance.get(['toggle', 'usda']).value ? this.transactionDetails.finance.get('usda').value : null,
        va: this.transactionDetails.finance.get(['toggle', 'va']).value ? this.transactionDetails.finance.get('va').value : null,
        homePossible: this.transactionDetails.finance.get(['toggle', 'homePossible']).value ? this.transactionDetails.finance.get('homePossible').value : null,
        homeReady: this.transactionDetails.finance.get(['toggle', 'homeReady']).value ? this.transactionDetails.finance.get('homeReady').value : null,
        conventional: this.transactionDetails.finance.get(['toggle', 'conventional']).value ? this.transactionDetails.finance.get('conventional').value : null,
        processStatus: Object.keys(this.transactionDetails.finance.getRawValue().processStatus).
        filter(x => this.transactionDetails.finance.getRawValue().processStatus[x]).slice(-1)[0]
      };
      //console.log(data);
      this.transactionService.saveLoanDetails({...this.transactionDetails.finance.value, ...data}).pipe(take(1)).subscribe(res => {
        //console.log(res);
        this.toaster.success('Saved');
        if (this.constant.homeBuyingProcessStatusIndex[data.processStatus] >= 5){
          this.getLoanDetails();
        }
      }, error => {
        //console.log(error);
        if (this.constant.RESPONSE_ERRORS[error.error.result.CODE]){
          this.toaster.error(error.error.result.details.MESSAGE);
        } else{
          this.toaster.error('Failed to save');
        }
      });
    } else {
      this.toaster.error('Failed to save');
    }
  }
  resetLoanType(): void{
    Object.keys(this.transactionDetails.finance.get('toggle').value).forEach(key => {
      this.subscription.push(
          this.transactionDetails.finance.get(['toggle', key]).valueChanges.subscribe(res => {
            if (!res){
              this.transactionDetails.finance.get(key).reset();
            }
          })
      );
    });
  }
  getLoanDetails(): void{
    this.transactionService.getBorrowerLoanDetails(this.transactionDetails.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      res = res.result;
      this.transactionDetails.user = res.buyer;
      this.transactionDetails.finance.patchValue({
        lockExpiryDate: res.lockExpiryDate ? this.dateFormat.fromModel(new Date(res.lockExpiryDate)) : null,
        lenderCommissionPercentage: res.lenderCommissionPercentage,
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
        fha: res.fha ? res.fha : this.transactionDetails.finance.get('fha'),
        va: res.va ? res.va : this.transactionDetails.finance.get('va'),
        usda: res.usda ? res.usda : this.transactionDetails.finance.get('usda'),
        homeReady: res.homeReady ? res.homeReady : this.transactionDetails.finance.get('homeReady'),
        homePossible: res.homePossible ? res.homePossible : this.transactionDetails.finance.get('homePossible'),
        conventional: res.conventional ? res.conventional : this.transactionDetails.finance.get('conventional')
      });
      const statusArray = Object.keys(this.transactionDetails.finance.getRawValue().processStatus);
      const statusIndex = statusArray.findIndex(x => x === res.processStatus);
      statusArray.forEach((x, index) => {
         if (index <= statusIndex){
            this.transactionDetails.finance.get(['processStatus', x]).setValue(true);
          }
      });
      this.transactionDetails.subjectProperty = res.targetProperty;
      this.transactionDetails.loader = true;
      if (this.constant.homeBuyingProcessStatusIndex[res.processStatus] >= 5){
        this.disableLoanForm();
      }
    }, error => {
      console.log(error);
    });
  }
  disableLoanForm(): void{
    this.transactionDetails.finance.get('toggle').disable();
    this.transactionDetails.finance.get('fha') ? this.transactionDetails.finance.get('fha').disable()
        : this.transactionDetails.finance.get('fha');
    this.transactionDetails.finance.get('usda') ? this.transactionDetails.finance.get('usda').disable()
        : this.transactionDetails.finance.get('usda');
    this.transactionDetails.finance.get('va') ? this.transactionDetails.finance.get('va').disable()
        : this.transactionDetails.finance.get('va');
    this.transactionDetails.finance.get('houseReady') ? this.transactionDetails.finance.get('houseReady').disable()
        : this.transactionDetails.finance.get('houseReady');
    this.transactionDetails.finance.get('homePossible') ? this.transactionDetails.finance.get('homePossible').disable()
        : this.transactionDetails.finance.get('homePossible');
    this.transactionDetails.finance.get('conventional') ? this.transactionDetails.finance.get('conventional').disable()
        : this.transactionDetails.finance.get('conventional');
    this.transactionDetails.finance.get('income').disable();
    this.transactionDetails.finance.get('sellerCredit').disable();
    this.transactionDetails.finance.get('funds').disable();
    this.transactionDetails.finance.get('monthlyDebt').disable();
  }
  validateLoanDetails(): boolean{
    let bool = true;
    Object.keys(this.transactionDetails.finance.getRawValue().toggle).forEach(x => {
      if (this.transactionDetails.finance.getRawValue().toggle[x]){
        if (!this.transactionDetails.finance.get(x).valid && !this.transactionDetails.finance.get(x).disabled){
          this.transactionDetails.finance.markAllAsTouched();
          bool = false;
        }
      }
    });
    return bool;
  }
  initializeForm(): void{
    this.transactionDetails.finance  = this.fb.group({
      lockExpiryDate: [null],
      lenderCommissionPercentage: [null],
      income: [null, Validators.required],
      monthlyDebt: [null, Validators.required],
      funds: [null, Validators.required],
      sellerCredit: [null, Validators.required],
      processStatus: this.fb.group({
        application: [null, Validators.required],
        preApproved: [null, Validators.required],
        acceptedOffer: [{value: null, disabled: true}, Validators.required],
        underwriting: [null, Validators.required],
        approvedWithConditions: [null, Validators.required],
        clearedToClose: [null, Validators.required],
        closed: [null, Validators.required],
      }) ,
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
        loanTerm: ['', Validators.required],
        loanRate: ['', Validators.required],
        housingRatio: ['', Validators.required],
        debtRatio: ['', Validators.required],
        privateMortgageInsurance: this.fb.group({
          fivePercentDown: ['', Validators.required],
          tenPercentDown: ['', Validators.required],
          fifteenPercentDown: ['', Validators.required],
        }),
        downPayment: this.fb.group({
          oneUnit: ['', [Validators.required, this.helper.downPaymentValidator(5)]],
          twoUnit: ['', [Validators.required, this.helper.downPaymentValidator(5)]],
          threeToFourUnit: ['', [Validators.required, this.helper.downPaymentValidator(5)]],
        }),
        reserves: this.fb.group({
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
        }),
        additionalReserves: ['', Validators.required],
      }),
      homePossible: this.fb.group({
        loanTerm: ['', Validators.required],
        loanRate: ['', Validators.required],
        downPayment: this.fb.group({
          oneUnit: ['', [Validators.required, this.helper.downPaymentValidator(3)]],
          twoUnit: ['', [Validators.required, this.helper.downPaymentValidator(3)]],
          threeToFourUnit: ['', [Validators.required, this.helper.downPaymentValidator(3)]],
        }),
        housingRatio: ['', Validators.required],
        debtRatio: ['', Validators.required],
        privateMortgageInsurance: this.fb.group({
          threePercentDown: ['', Validators.required],
          fivePercentDown: ['', Validators.required],
          tenPercentDown: ['', Validators.required],
          fifteenPercentDown: ['', Validators.required],
        }),
        reserves: this.fb.group({
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
        }),
        additionalReserves: ['', Validators.required],
      }),
      homeReady: this.fb.group({
        loanTerm: ['', Validators.required],
        loanRate: ['', Validators.required],
        downPayment: this.fb.group({
          oneUnit: ['', [Validators.required, this.helper.downPaymentValidator(2)]],
          twoUnit: ['', [Validators.required, this.helper.downPaymentValidator(2)]],
          threeToFourUnit: ['', [Validators.required, this.helper.downPaymentValidator(2)]],
        }),
        housingRatio: ['', Validators.required],
        debtRatio: ['', Validators.required],
        privateMortgageInsurance: this.fb.group({
          threePercentDown: ['', Validators.required],
          fivePercentDown: ['', Validators.required],
          tenPercentDown: ['', Validators.required],
          fifteenPercentDown: ['', Validators.required],
        }),
        reserves: this.fb.group({
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
        }),
        additionalReserves: ['', Validators.required],
      }),
      va: this.fb.group({
        downPayment: ['', Validators.required],
        loanTerm: ['', Validators.required],
        loanRate: ['', Validators.required],
        housingRatio: ['', Validators.required],
        debtRatio: ['', Validators.required],
        veteranType: ['', Validators.required],
        reserves: this.fb.group({
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
        }),
        additionalReserves: ['', Validators.required],
      }),
      usda: this.fb.group({
        downPayment: ['', Validators.required],
        loanTerm: ['', Validators.required],
        loanRate: ['', Validators.required],
        housingRatio: ['', Validators.required],
        debtRatio: ['', Validators.required],
        mortgageInsurance: this.fb.group({
          fundingFee: ['', Validators.required],
          monthlyMi: ['', Validators.required],
        }),
        reserves: ['', Validators.required],
      })
    });
  }
}
