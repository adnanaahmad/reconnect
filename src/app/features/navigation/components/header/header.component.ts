import {Component, HostListener, OnInit} from '@angular/core';
import {StoreService} from '../../../../core/store/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle: boolean;
  notification: any = {};
  constructor(public store: StoreService) { }

  ngOnInit(): void {
    this.notification.toggle = false;
    this.store.toggleNotification.subscribe(result => {
      this.notification.toggle = result;
    });
    this.store.user.subscribe(res => {
      console.log(res);
    });
  }
  notificationToggle(): boolean{
    this.notification.toggle = !this.notification.toggle;
    return this.notification.toggle;
  }
}
