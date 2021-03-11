import {Subscription} from 'rxjs';

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
