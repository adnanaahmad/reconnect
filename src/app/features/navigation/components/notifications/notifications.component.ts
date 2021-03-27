import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationModel} from '../../models/navigation.model';
import {ConstantService} from '../../../../core/constant/constant.service';
import {HelperService} from '../../../../core/helper/helper.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../core/store/store.service';
import * as moment from 'moment';
import {NavigationService} from '../../service/navigation.service';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() notification: NotificationModel;
  @Output() toggleNotification = new EventEmitter<any>();
  constructor(public constant: ConstantService,
              public helper: HelperService,
              private route: Router,
              public store: StoreService,
              private navService: NavigationService) { }

  ngOnInit(): void {
  }
  navigateToURL(route): void{
    if (route){
      this.route.navigateByUrl(route).then();
    }
    this.toggleNotification.emit(true);
    this.navService.readNotification({notificationId: this.notification._id}).pipe(take(1)).subscribe(res => {
      this.notification.read = true;
    }, error => {
      console.log(error);
    });
  }

  getMinimalisticRelativeTime(dateTime): string {
    if (!dateTime) {
      return null;
    }

    const today = moment();

    const time = moment(dateTime);

    const diff = today.diff(time);

    const duration = moment.duration(diff);
    if (duration.years() > 0) {
      return duration.years() + 'y';
    } else if (duration.weeks() > 0) {
      return duration.weeks() + 'w';
    } else if (duration.days() > 0) {
      return duration.days() + 'd';
    } else if (duration.hours() > 0) {
      return duration.hours() + 'h';
    } else if (duration.minutes() > 0) {
      return duration.minutes() + 'm';
    } else if (duration.minutes() < 1) {
      return '1s';
    }
  }
}
