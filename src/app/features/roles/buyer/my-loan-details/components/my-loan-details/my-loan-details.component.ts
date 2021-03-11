import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoanDetailsModel} from '../../models/loanDetails.model';
import {LoanDetailsService} from '../../services/loan-details.service';
import {ToastrService} from 'ngx-toastr';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-my-loan-details',
  templateUrl: './my-loan-details.component.html',
  styleUrls: ['./my-loan-details.component.scss']
})
export class MyLoanDetailsComponent implements OnInit {
  loanDetails: LoanDetailsModel = {} as LoanDetailsModel;
  loader: boolean;
  constructor(private fb: FormBuilder,
              private loadDetailsService: LoanDetailsService,
              private toaster: ToastrService,
              private store: StoreService) { }

  ngOnInit(): void {
    this.loader = false;
    this.store.updateProgressBarLoading(true);
    this.initializeLoanDetails();
    this.getLoanDetails();
//    this.loanDetails.finance.valueChanges.subscribe(newval => console.log(newval));
    this.resetLoanType();
  }
  onSubmit(): void{
    console.log(this.loanDetails.finance.value);
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
    this.loadDetailsService.setLoanDetails({...this.loanDetails.finance.value, ...data}).subscribe(res => {
      console.log(res);
      this.toaster.success('Saved');
    }, error => {
      console.log(error);
      this.toaster.error('Failed To Save');
    });
  }
  resetLoanType(): void{
    Object.keys(this.loanDetails.finance.get('toggle').value).forEach(key => {
      this.loanDetails.finance.get(['toggle', key]).valueChanges.subscribe(res => {
        if (!res){
          this.loanDetails.finance.get(key).reset();
        }
      });
    });
  }
  getLoanDetails(): void{
    this.loadDetailsService.getLoanDetails().subscribe(res => {
      console.log(res);
      res = res.result;
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
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  initializeLoanDetails(): void{
    this.loanDetails.finance = this.fb.group({
      income: ['', Validators.required],
      monthlyDebt: ['', Validators.required],
      funds: ['', Validators.required],
      sellerCredit: ['', Validators.required],
      toggle: this.fb.group({
        fha: [null, Validators.required],
        conventional: [null, Validators.required],
        homePossible: [null, Validators.required],
        homeReady: [null, Validators.required],
        va: [null, Validators.required],
        usda: [null, Validators.required],
      }) ,
      fha: this.fb.group({
        downPayment: ['', Validators.required],
        loanTerm: ['', Validators.required],
        loanRate: ['', Validators.required],
        housingRatio: ['', Validators.required],
        debtRatio: ['', Validators.required],
        mortgageInsuranceUnder: this.fb.group({
          fundingFee: ['', Validators.required],
          monthlyMiUnder: ['', Validators.required],
          monthlyMiOver: ['', Validators.required],
        }),
        mortgageInsuranceAbove: this.fb.group({
          fundingFee: ['', Validators.required],
          monthlyMiUnder: ['', Validators.required],
          monthlyMiOver: ['', Validators.required],
        }),
        reserves: this.fb.group({
          oneUnit: ['', Validators.required],
          twoUnit: ['', Validators.required],
          threeToFourUnit: ['', Validators.required],
        }),
        additionalReserves: ['', Validators.required],
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
