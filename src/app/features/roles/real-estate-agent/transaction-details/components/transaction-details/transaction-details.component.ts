import { Component, OnInit } from '@angular/core';
import {BuyerTransactionDetailsModel} from '../../models/buyerTransactionDetails.model';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails: BuyerTransactionDetailsModel = {} as BuyerTransactionDetailsModel;
  constructor( private fb: FormBuilder) { }

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
    // this.transactionDetails.user = {
    //   name: 'Rafal Nadal',
    //   phone: '+428 76 3 9823',
    //   email: 'abc@gmail.com',
    //   socialMedia: {
    //     facebook: 'https://www.google.com/',
    //     instagram: 'https://www.google.com/',
    //     twitter: 'https://www.google.com/'
    //   },
    //   image: 'https://chicagophotovideo.com/wp-content/uploads/2018/01/professional-headshot-for-corporate-website-1024x683.jpg',
    //   referredBy: 'Boris Gastelu'
    // };
    this.transactionDetails.finance = this.fb.group({
      transactionProcess: this.fb.group({
        application: [{value: true, disabled: true}, Validators.required],
        preApproved: [{value: true, disabled: true}, Validators.required],
        acceptedOffer: [{value: false, disabled: false}, Validators.required],
        underwriting: [{value: true, disabled: true}, Validators.required],
        approvedWithConditions: [{value: false, disabled: true}, Validators.required],
        clearedToClose: [{value: false, disabled: true}, Validators.required],
      })
    });
    this.transactionDetails.transactionDetails = {
      purchasePrice: 200000,
      closingDate: new Date('3-3-2020'),
      commitmentDate: new Date('6-15-2020'),
      commissionAmount: 2.5,
      listingAgent: 'Jose Smith / Remax Professionals',
      sellerCredit: 5000,
      homeInspectionDate: new Date('9-20-2020'),
      purchaseSalesDate: new Date('12-31-2020')
    };
    this.transactionDetails.finance.valueChanges.subscribe(newval => console.log(newval));
  }

}
