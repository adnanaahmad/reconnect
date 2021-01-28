import {FormGroup} from '@angular/forms';

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
}

export interface UserProfileEditModel {
  profileForm: FormGroup;
  image: string;
  fileUpload: File;
  states: Array<any>;
  cities: Array<any>;
}
interface SocialMediaModel{
  facebook: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
}

export interface ProfessionalProfileModel {
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  role: string;
  bio: string;
  profileVideoUrl: string;
  phoneNumber: string;
  birthday: Date;
  email: string;
  socialMedia: SocialMediaModel;
  realEstateLicenseNumber: number;
  licenseNumber: number;
  brokerLicense: number;
  company: CompanyModal;
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
