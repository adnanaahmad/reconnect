import {Subscription} from 'rxjs';
import {UserProfileModel} from '../../roles/common/profile/models/user-profile.model';

export interface MenuItem{
  name: string;
  tooltip: string;
  icon: string;
  route: string;
  order: number;
}
export interface NavigationModel {
  menuItems: Array<MenuItem>;
  selectedButton: MenuItem;
  loader: any;
  loaderSubscription: Subscription;
  profileButtonSubscription: Subscription;
}

export interface NotificationModel{
  createdAt: string;
  from: UserProfileModel;
  listable: boolean;
  meta: any;
  read: boolean;
  target: string;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
