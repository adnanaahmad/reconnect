import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../../../core/store/store.service';
import {ProfileService} from '../../../roles/common/profile/services/profile.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  toggle: boolean;
  notification: any = {};
  image = '';
  firstName = '';
  lastName = '';
  subscription: Array<Subscription>;
  constructor(public store: StoreService, public profile: ProfileService) { }

  ngOnInit(): void {
    this.subscription = [];
    this.notification.toggle = false;
    this.subscription.push(
        this.store.toggleNotification.subscribe(result => {
          this.notification.toggle = result;
        })
    );
    this.subscription.push(
        this.store.userData.subscribe(res => {
          this.image = res.profilePictureUrl;
          this.firstName = res.firstName;
          this.lastName = res.lastName;
        })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  notificationToggle(): boolean{
    this.notification.toggle = !this.notification.toggle;
    return this.notification.toggle;
  }
}
