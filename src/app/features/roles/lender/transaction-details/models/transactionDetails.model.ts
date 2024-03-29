import {FormGroup} from '@angular/forms';
import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';
import {PropertyAdModel} from '../../../common/property-details/models/property-details.model';

export interface TransactionDetailsModel {
  subjectProperty: PropertyAdModel;
  user: UserModel;
  // borrowerDetails: BorrowerDetailsModel;
  finance: FormGroup;
  id: string;
  loader: boolean;
  fixedExpenses: any;
  variableExpenses: any;
  processStatus: string;
  inactiveDeal: boolean;
}

export interface  UserModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  rentAmount: number;
  birthday: Date;
  referredBy: string;
}

interface  BorrowerDetailsModel {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  phone: string;
  rentAmount: number;
}
