import {UserModel} from '../../../lender/transaction-details/models/transactionDetails.model';
import {FormGroup} from '@angular/forms';
import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';

export interface BuyerTransactionDetailsModel {
  user: UserModel;
  finance: FormGroup;
  subjectProperty: SubjectPropertyModel;
  transactionDetails: TransactionDetailsModel;
}

interface TransactionDetailsModel {
  purchasePrice: number;
  closingDate: Date;
  commitmentDate: Date;
  commissionAmount: number;
  listingAgent: string;
  sellerCredit: number;
  homeInspectionDate: Date;
  purchaseSalesDate: Date;
}
