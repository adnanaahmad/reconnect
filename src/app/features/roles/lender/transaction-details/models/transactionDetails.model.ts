import {FormGroup} from '@angular/forms';
import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';

export interface TransactionDetailsModel {
  subjectProperty: SubjectPropertyModel;
  user: UserModel;
  borrowerDetails: BorrowerDetailsModel;
  finance: FormGroup;
}

export interface  UserModel {
  name: string;
  phone: string;
  email: string;
  image: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
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
