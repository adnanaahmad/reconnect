import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoanDetailsModel} from '../../models/loanDetails.model';
//import {FhaComponent} from '../../../../../../shared/components/fha/fha.component';

@Component({
  selector: 'app-my-loan-details',
  templateUrl: './my-loan-details.component.html',
  styleUrls: ['./my-loan-details.component.scss']
})
export class MyLoanDetailsComponent implements OnInit {
  loanDetails: LoanDetailsModel = {} as LoanDetailsModel;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.loanDetails.finance = this.fb.group({
        myFinance: this.fb.group({
        income: ['', Validators.required],
        monthlyDebt: ['', Validators.required],
        funds: ['', Validators.required],
        sellerCredit: ['', Validators.required],
      }),
      toggle: this.fb.group({
        fha: [true, Validators.required],
        conventional: [false, Validators.required],
        homePossible: [false, Validators.required],
        homeReady: [false, Validators.required],
        va: [true, Validators.required],
        usda: [false, Validators.required],
      }) ,
      fha: this.fb.group({
        loanDetails: this.fb.group({
          downPayment: ['', Validators.required],
          loanTerm: ['', Validators.required],
          loanRate: ['', Validators.required],
        }),
        ratios: this.fb.group({
          housingRatio: ['', Validators.required],
          debtRatio: ['', Validators.required],
        }),
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
        additionalReserves: this.fb.group({
          reserves: ['', Validators.required],
        }),
      }),
      conventional: this.fb.group({
        loanDetails: this.fb.group({
          downPayment: ['', Validators.required],
          loanTerm: ['', Validators.required],
          loanRate: ['', Validators.required],
        }),
        ratios: this.fb.group({
          housingRatio: ['', Validators.required],
          debtRatio: ['', Validators.required],
        }),
        privateMortgageInsurance: this.fb.group({
          fivePercentDown: ['', Validators.required],
          tenPercentDown: ['', Validators.required],
          fifteenPercentDown: ['', Validators.required],
        }),
        additionalReserves: this.fb.group({
          reserves: ['', Validators.required],
        }),
      }),
        homePossible: this.fb.group({
        loanDetails: this.fb.group({
          downPayment: ['', Validators.required],
          loanTerm: ['', Validators.required],
          loanRate: ['', Validators.required],
        }),
        ratios: this.fb.group({
          housingRatio: ['', Validators.required],
          debtRatio: ['', Validators.required],
        }),
        privateMortgageInsurance: this.fb.group({
          threePercentDown: ['', Validators.required],
          fivePercentDown: ['', Validators.required],
          tenPercentDown: ['', Validators.required],
          fifteenPercentDown: ['', Validators.required],
        }),
        additionalReserves: this.fb.group({
          reserves: ['', Validators.required],
        }),
      }),
      homeReady: this.fb.group({
        loanDetails: this.fb.group({
          downPayment: ['', Validators.required],
          loanTerm: ['', Validators.required],
          loanRate: ['', Validators.required],
        }),
        ratios: this.fb.group({
          housingRatio: ['', Validators.required],
          debtRatio: ['', Validators.required],
        }),
        privateMortgageInsurance: this.fb.group({
          threePercentDown: ['', Validators.required],
          fivePercentDown: ['', Validators.required],
          tenPercentDown: ['', Validators.required],
          fifteenPercentDown: ['', Validators.required],
        }),
        additionalReserves: this.fb.group({
          reserves: ['', Validators.required],
        }),
      }),
      va: this.fb.group({
        loanDetails: this.fb.group({
          downPayment: ['', Validators.required],
          loanTerm: ['', Validators.required],
          loanRate: ['', Validators.required],
        }),
        ratios: this.fb.group({
          housingRatio: ['', Validators.required],
          debtRatio: ['', Validators.required],
        }),
        mortgageInsurance: this.fb.group({
          veteranType: ['', Validators.required],
        }),
        additionalReserves: this.fb.group({
          reserves: ['', Validators.required],
        }),
      }),
      usda: this.fb.group({
        loanDetails: this.fb.group({
          downPayment: ['', Validators.required],
          loanTerm: ['', Validators.required],
          loanRate: ['', Validators.required],
        }),
        ratios: this.fb.group({
          housingRatio: ['', Validators.required],
          debtRatio: ['', Validators.required],
        }),
        mortgageInsurance: this.fb.group({
          fundingFee: ['', Validators.required],
          monthlyMi: ['', Validators.required],
        }),
        additionalReserves: this.fb.group({
          reserves: ['', Validators.required],
        }),
      })
    });

    this.loanDetails.finance.valueChanges.subscribe(newval => console.log(newval));
  }
  onSubmit(): void{
    console.log(this.loanDetails.finance.value);
  }
}
