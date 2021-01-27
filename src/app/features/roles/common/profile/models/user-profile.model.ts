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
}
interface SocialMediaModel{
  facebook: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
}
