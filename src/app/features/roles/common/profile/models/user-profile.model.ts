import {FormGroup} from '@angular/forms';
import {SafeValue} from '@angular/platform-browser';

export interface UserProfileModel {
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  role: string;
  bio: string;
  phoneNumber: string;
  gender: string;
  website: string;
  birthday: Date;
  email: string;
  addresses: Array<string>;
  state: string;
  city: string;
  socialMedia: SocialMediaModel;
  loader: boolean;
  _id: string;
}

export interface UserProfileEditModel {
  profileForm: FormGroup;
  image: string;
  fileUpload: File;
  states: Array<any>;
  cities: Array<any>;
  loader: boolean;
}
interface SocialMediaModel{
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export interface ProfessionalProfileModel {
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  role: string;
  bio: string;
  profileVideoUrl: string | SafeValue;
  phoneNumber: string;
  birthday: Date;
  email: string;
  socialMedia: SocialMediaModel;
  realEstateLicenseNumber: number;
  licenseNumber: number;
  brokerLicense: number;
  company: CompanyModal;
  nmlsNumber: number;
  _id: string;
}
interface CompanyModal{
  city: string;
  licenseNumber: number;
  name: string;
  phoneNumber: number;
  state: string;
  street: string;
  faxNumber: string;
  zip: number;
  companyLogoUrl: string;
}
