import {FormGroup} from '@angular/forms';
import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';

export interface TransactionDetailsModel {
  subjectProperty: SubjectPropertyModel;
  user: UserModel;
  // borrowerDetails: BorrowerDetailsModel;
  finance: FormGroup;
  id: string;
  loader: boolean;
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
