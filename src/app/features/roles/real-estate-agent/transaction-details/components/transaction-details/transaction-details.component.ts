import { Component, OnInit } from '@angular/core';
import {BuyerTransactionDetailsModel} from '../../models/buyerTransactionDetails.model';
import {FormBuilder, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {BorrowerLoanDetailsService} from '../../../../lender/transaction-details/services/borrower-loan-details.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddPropertyMlsComponent} from '../../popups/add-property-mls/add-property-mls.component';
import {BuyerTransactionDetailsService} from '../../services/buyer-transaction-details.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails: BuyerTransactionDetailsModel = {} as BuyerTransactionDetailsModel;
  constructor( private fb: FormBuilder,
               private transactionService: BorrowerLoanDetailsService,
               private activatedRoute: ActivatedRoute,
               private toaster: ToastrService,
               public location: Location,
               private modalService: NgbModal,
               private configuration: NgbModalConfig) {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.transactionDetails.id = routeParams.get('id');
    configuration.centered = true;
    configuration.container = 'app-transaction-details';
  }

  ngOnInit(): void {
    this.transactionDetails.loader = false;
    this.initializeForm();
    this.transactionDetails.finance.valueChanges.subscribe(newval => console.log(newval));
    this.getLoanDetails();
  }
  initializeForm(): void{
    this.transactionDetails.finance = this.fb.group({
      processStatus: this.fb.group({
        application: [{value: null, disabled: true}, Validators.required],
        preApproved: [{value: null, disabled: true}, Validators.required],
        acceptedOffer: [{value: null, disabled: false}, Validators.required],
        underwriting: [{value: null, disabled: true}, Validators.required],
        approvedWithConditions: [{value: null, disabled: true}, Validators.required],
        clearedToClose: [{value: null, disabled: true}, Validators.required],
        closed: [{value: null, disabled: true}, Validators.required],
      })
    });
  }
  getLoanDetails(): void{
    this.transactionService.getBorrowerLoanDetails(this.transactionDetails.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      res = res.result;
      this.transactionDetails.user = res.buyer;
      this.transactionDetails.loanId = res._id;
      const statusArray = Object.keys(this.transactionDetails.finance.getRawValue().processStatus);
      const statusIndex = statusArray.findIndex(x => x === res.processStatus);
      statusArray.forEach((x, index) => {
        if (index <= statusIndex){
          this.transactionDetails.finance.get(['processStatus', x]).setValue(true);
        }
      });
      this.transactionDetails.subjectProperty = res.targetProperty ? res.targetPropertyDetails : null;
      this.transactionDetails.transactionDetails = {
        purchasePrice: 200000,
        closingDate: new Date('3-3-2020'),
        commitmentDate: new Date('6-15-2020'),
        commissionAmount: 2.5,
        listingAgent: 'Jose Smith / Remax Professionals',
        sellerCredit: res.sellerCredit,
        homeInspectionDate: new Date('9-20-2020'),
        purchaseSalesDate: new Date('12-31-2020')
      };
      this.transactionDetails.loader = true;
    }, error => {
      console.log(error);
    });
  }
  onSubmit(): void{
    const data = {
      borrowerId: this.transactionDetails.id,
      processStatus: Object.keys(this.transactionDetails.finance.getRawValue().processStatus).
      filter(x => this.transactionDetails.finance.getRawValue().processStatus[x]).slice(-1)[0]
    };
    this.transactionService.saveLoanDetails({...this.transactionDetails.finance.value, ...data}).pipe(take(1)).subscribe(res => {
      this.toaster.success('Saved');
    }, error => {
      this.toaster.error('Failed to save');
    });
  }
  addPropertyMls(): void{
    console.log(this.transactionDetails.id);
    const modalRef = this.modalService.open(AddPropertyMlsComponent);
    modalRef.componentInstance.loanId = this.transactionDetails.loanId;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.transactionDetails.subjectProperty = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
}
