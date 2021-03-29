import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../../../core/store/store.service';
import {ProfileService} from '../../../roles/common/profile/services/profile.service';
import {Subscription} from 'rxjs';
import {NavigationService} from '../../service/navigation.service';
import {take} from 'rxjs/operators';
import {WebSocketService} from '../../../../core/webSockets/web-socket.service';

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
  constructor(public store: StoreService,
              public profile: ProfileService,
              private navigationService: NavigationService,
              private webSocket: WebSocketService) { }

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
    this.getNotifications();
    this.listenNotifications();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  notificationToggle(): boolean{
    this.notification.toggle = !this.notification.toggle;
    if (this.notification.toggle){
      this.store.updateUnreadNotification(false);
    }
    return this.notification.toggle;
  }
  getNotifications(): void{
    this.navigationService.getNotifications().pipe(take(1)).subscribe(res => {
      console.log('notification', res);
      this.notification.list = res.result;
      this.notification.list.forEach(x => {
        if (!x.read){
          this.store.updateUnreadNotification(true);
        }
      });
    }, error => {
      console.log(error);
    });
  }
  listenNotifications(): void{
    this.subscription.push(
      this.webSocket.listen('client-notification-newActivity').subscribe(res => {
        console.log('socket notification', res);
        this.notification.list.unshift(res);
        this.store.updateUnreadNotification(true);
      })
    );
  }
}
