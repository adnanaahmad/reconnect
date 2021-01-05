import { Component, OnInit } from '@angular/core';
import {LoanDetailsModel} from '../../../../buyer/my-loan-details/models/loanDetails.model';
import {FormBuilder, Validators} from '@angular/forms';
import {TransactionDetailsModel} from '../../models/transactionDetails.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails: TransactionDetailsModel = {} as TransactionDetailsModel;
  loanDetails: LoanDetailsModel = {} as LoanDetailsModel;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
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
    this.transactionDetails.borrowerDetails = {
      firstName: 'Rafael',
      lastName: 'Nadal',
      email: 'abc@gmail.com',
      phone: '+428 76 3 9823',
      birthday: new Date('2019-02-1'),
      rentAmount: 23467
    };
    this.transactionDetails.user = {
      name: 'Rafal Nadal',
      phone: '+428 76 3 9823',
      email: 'abc@gmail.com',
      socialMedia: {
        facebook: 'https://www.google.com/',
        instagram: 'https://www.google.com/',
        twitter: 'https://www.google.com/'
      },
      image: 'https://chicagophotovideo.com/wp-content/uploads/2018/01/professional-headshot-for-corporate-website-1024x683.jpg',
      referredBy: 'Boris Gastelu'
    };
    this.transactionDetails.finance = this.fb.group({
      transactionProcess: this.fb.group({
        application: [{value: true}, Validators.required],
        preApproved: [false, Validators.required],
        acceptedOffer: [{value: false, disabled: true}, Validators.required],
        underwriting: [false, Validators.required],
        approvedWithConditions: [true, Validators.required],
        clearedToClose: [false, Validators.required],
      }) ,
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
      }),
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

    this.transactionDetails.finance.valueChanges.subscribe(newval => console.log(newval));
  }
  onSubmit(){
    //console.log(this.finance.value);
  }
}
