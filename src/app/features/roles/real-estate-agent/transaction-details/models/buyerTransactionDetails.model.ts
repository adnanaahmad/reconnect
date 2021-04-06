import {UserModel} from '../../../lender/transaction-details/models/transactionDetails.model';
import {FormGroup} from '@angular/forms';
import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';
import {PropertyAdModel} from '../../../common/property-details/models/property-details.model';

export interface BuyerTransactionDetailsModel {
  user: UserModel;
  finance: FormGroup;
  subjectProperty: PropertyAdModel;
  transactionDetails: TransactionDetailsModel;
  id: string;
  loader: boolean;
  loanId: string;
  showCancelDeal: boolean;
  inactiveDeal: boolean;
}

interface TransactionDetailsModel {
  commissionAmount: string;
  listingAgent: string;
  sellerCredit: string;
  homeInspectionDate: Date;
}
