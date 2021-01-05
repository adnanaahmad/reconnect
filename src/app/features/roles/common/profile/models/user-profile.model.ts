import {FormGroup} from '@angular/forms';

export interface UserProfileModel {
  name: string;
  image: string;
  role: string;
  bio: string;
  phone: string;
  gender: string;
  website: string;
  birthday: Date;
  email: string;
  location: string;
  address: string;
}

export interface UserProfileEditModel {
  profileForm: FormGroup;
}
