import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../../service/navigation.service';
import { NavigationModel } from '../../models/navigation.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {StoreService} from '../../../../core/store/store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navigation: NavigationModel = {} as NavigationModel;
  subscription: Subscription;
  showHeader: boolean;
  constructor(private navigationService: NavigationService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private store: StoreService) {}

  ngOnInit(): void {
    this.navigation.menuItems = this.navigationService.getBuyerMenuItems();
    const index = this.navigation.menuItems.findIndex(x => x.route === this.router.url);
    this.navigation.selectedButton = this.navigation.menuItems[index];
    this.showProfileButton();
    this.setRole();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  setRole(): void{
    const data = JSON.parse(localStorage.getItem('user')).role;
    this.store.setRole(data);
    switch (data) {
      case 'buyer':
        this.navigation.menuItems = this.navigationService.getBuyerMenuItems();
        break;
      case 'lender':
        this.navigation.menuItems = this.navigationService.getLenderMenuItems();
        break;
      case 'realEstate':
        this.navigation.menuItems = this.navigationService.getRealEstateAgentMenuItems();
        break;
      case 'attorney':
        this.navigation.menuItems = this.navigationService.getAttorneyMenuItems();
        break;
      case 'homeInspector':
        this.navigation.menuItems = this.navigationService.getHomeInspectorMenuItems();
        break;
      default:
    }
  }
  iconURL(data) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
  listClick(value): void{
    this.navigation.selectedButton = value;
    if (value.name === 'Logout'){
      localStorage.clear();
    }
  }
  // role(data): void {
  //     console.log(data);
  //     switch (data) {
  //       case 'buyer':
  //         this.navigation.menuItems = this.navigationService.getBuyerMenuItems();
  //         break;
  //       case 'lender':
  //         this.navigation.menuItems = this.navigationService.getLenderMenuItems();
  //         break;
  //       case 'realEstate':
  //         this.navigation.menuItems = this.navigationService.getRealEstateAgentMenuItems();
  //         break;
  //       case 'attorney':
  //         this.navigation.menuItems = this.navigationService.getAttorneyMenuItems();
  //         break;
  //       case 'homeInspector':
  //         this.navigation.menuItems = this.navigationService.getHomeInspectorMenuItems();
  //         break;
  //       default:
  //   }
  // }
  showProfileButton(): void{
    this.showHeader = !this.router.url.includes('profile');
    this.subscription = this.router.events.subscribe((val) => {
      this.navigation.selectedButton = this.navigation.menuItems[this.navigation.menuItems.findIndex(x => x.route === this.router.url)];
      this.showHeader = !this.router.url.includes('profile');
    });
  }
}
