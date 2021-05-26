import {UserProfileModel} from '../../profile/models/user-profile.model';
import {FormControl} from '@angular/forms';

export interface ProfessionalDirectoryModel {
  selectedButton: string;
  buttons: Array<string>;
  professionalDirectory: Array<UserProfileModel>;
  searchName: FormControl;
}
