import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../../service/navigation.service';
import { NavigationModel } from '../../models/navigation.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {StoreService} from '../../../../core/store/store.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {LocationService} from '../../../landing/services/location/location.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navigation: NavigationModel = {} as NavigationModel;
  showHeader: boolean;
  constructor(private navigationService: NavigationService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private store: StoreService,
              private constant: ConstantService,
              private location: LocationService,
              private loadingBar: LoadingBarService) {}

  ngOnInit(): void {
    this.navigation.loader = this.loadingBar.useRef();
    this.navigation.loaderSubscription = this.store.progressBarLoading.subscribe(res => {
      res ? this.startLoading() : this.stopLoading();
    });
    this.setRoleAndMenu();
    this.showProfileButton();
    this.store.updateUserData(JSON.parse(localStorage.getItem('user')));
    this.location.saveLocationApiToken();
  }
  ngOnDestroy(): void {
    this.navigation.profileButtonSubscription.unsubscribe();
    this.navigation.loaderSubscription.unsubscribe();
  }
  setRoleAndMenu(): void{
    const data = JSON.parse(localStorage.getItem('user')).role;
    this.store.roleSubject.next(data);
    switch (this.store.role) {
      case this.constant.role.BUYER:
        this.navigation.menuItems = this.navigationService.getBuyerMenuItems();
        break;
      case this.constant.role.LENDER:
        this.navigation.menuItems = this.navigationService.getLenderMenuItems();
        break;
      case this.constant.role.REAL_ESTATE:
        this.navigation.menuItems = this.navigationService.getRealEstateAgentMenuItems();
        break;
      case this.constant.role.ATTORNEY:
        this.navigation.menuItems = this.navigationService.getAttorneyMenuItems();
        break;
      case this.constant.role.HOME_INSPECTOR:
        this.navigation.menuItems = this.navigationService.getHomeInspectorMenuItems();
        break;
      default:
    }
    this.setMenuButton();
  }
  iconURL(data) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
  listClick(value): void{
    this.navigation.selectedButton = value;
  }
  showProfileButton(): void{
    this.showHeader = !this.router.url.includes('profile');
    this.navigation.profileButtonSubscription = this.router.events.subscribe((val) => {
      this.setMenuButton();
      this.showHeader = !this.router.url.includes('profile');
    });
  }
  startLoading(): void {
    this.navigation.loader.start();
  }

  stopLoading(): void {
    this.navigation.loader.complete();
  }
  setMenuButton(): void{
    const index = this.navigation.menuItems.findIndex(x =>  this.router.url.includes(x.route));
    this.navigation.selectedButton = this.navigation.menuItems[index];
  }
}
