import { Component, OnInit } from '@angular/core';
import {LoanDetailsModel} from '../../../../buyer/my-loan-details/models/loanDetails.model';
import {FormBuilder, Validators} from '@angular/forms';
import {TransactionDetailsModel} from '../../models/transactionDetails.model';
import {BorrowerLoanDetailsService} from '../../services/borrower-loan-details.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';
import {log} from 'util';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails: TransactionDetailsModel = {} as TransactionDetailsModel;
  constructor(private fb: FormBuilder,
              private transactionService: BorrowerLoanDetailsService,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService,
              public location: Location) {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.transactionDetails.id = routeParams.get('id');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.transactionDetails.loader = false;
    this.getLoanDetails();
    this.transactionDetails.subjectProperty = {
      image: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHw%3D&w=1000&q=80',
      bathrooms: 2,
      bedrooms: 2,
      garage: 1,
      sqFt: 1594,
      status: 'Active',
      propertyType: '2 Units Up/Down',
      lotSize: 4898,
      timeOnMarket: '8 Days',
      community: 'Worcester',
      mls: 726168,
    };
    this.resetLoanType();
    //this.transactionDetails.finance.valueChanges.subscribe(newval => console.log(newval));
  }
  onSubmit(): void{
    const data = {
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
    this.transactionService.saveLoanDetails({...this.transactionDetails.finance.value, ...data}).subscribe(res =>{
      //console.log(res);
      this.toaster.success('Saved');
    }, error => {
      //console.log(error);
      this.toaster.error('Failed to save');
    });
  }
  resetLoanType(): void{
    Object.keys(this.transactionDetails.finance.get('toggle').value).forEach(key => {
      this.transactionDetails.finance.get(['toggle', key]).valueChanges.subscribe(res => {
        if (!res){
          this.transactionDetails.finance.get(key).reset();
        }
      });
    });
  }
  getLoanDetails(): void{
    this.transactionService.getBorrowerLoanDetails(this.transactionDetails.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      res = res.result;
      this.transactionDetails.user = res.buyer;
      this.transactionDetails.finance.patchValue({
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
      this.transactionDetails.loader = true;
    }, error => {
      console.log(error);
    });
  }
  initializeForm(): void{
    this.transactionDetails.finance  = this.fb.group({
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
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
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
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
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
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
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
