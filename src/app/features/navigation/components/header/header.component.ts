import {Component, HostListener, OnInit} from '@angular/core';
import {StoreService} from '../../../../core/store/store.service';
import {ProfileService} from '../../../roles/common/profile/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle: boolean;
  notification: any = {};
  image = '';
  name = '';
  constructor(public store: StoreService, public profile: ProfileService) { }

  ngOnInit(): void {
    this.notification.toggle = false;
    this.store.toggleNotification.subscribe(result => {
      this.notification.toggle = result;
    });
    this.store.userData.subscribe(res => {
      this.image = res.profilePictureUrl;
      this.name = res.firstName + ' ' + res.lastName;
    });
  }
  notificationToggle(): boolean{
    this.notification.toggle = !this.notification.toggle;
    return this.notification.toggle;
  }
}
