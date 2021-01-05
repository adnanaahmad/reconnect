import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../../service/navigation.service';
import { NavigationModel } from '../../models/navigation.model';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navigation: NavigationModel = {} as NavigationModel;
  subscription: Subscription;
  showHeader: boolean;
  constructor(private navigationService: NavigationService, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit(): void {
    this.navigation.menuItems = this.navigationService.getBuyerMenuItems();
    const index = this.navigation.menuItems.findIndex(x => x.route === this.router.url);
    this.navigation.selectedButton = this.navigation.menuItems[index];
    this.showHeader = this.router.url !== '/home/profile' && this.router.url !== '/home/profile/editProfile';
    this.subscription = this.router.events.subscribe((val) => {
      this.navigation.selectedButton = this.navigation.menuItems[this.navigation.menuItems.findIndex(x => x.route === this.router.url)];
      this.showHeader = this.router.url !== '/home/profile' && this.router.url !== '/home/profile/editProfile';
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  iconURL(data) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
  listClick(value): void{
    this.navigation.selectedButton = value;
  }
}
