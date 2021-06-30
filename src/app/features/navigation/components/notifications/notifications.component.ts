import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationComponentModel, NotificationModel} from '../../models/navigation.model';
import {ConstantService} from '../../../../core/constant/constant.service';
import {HelperService} from '../../../../core/helper/helper.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../core/store/store.service';
import {NavigationService} from '../../service/navigation.service';
import {take} from 'rxjs/operators';
import {DatePipe, TitleCasePipe} from '@angular/common';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [TitleCasePipe, DatePipe ]
})
export class NotificationsComponent implements OnInit {
  @Input() notification: NotificationModel;
  @Output() toggleNotification = new EventEmitter<any>();
  notificationInfo: NotificationComponentModel = {} as NotificationComponentModel;
  constructor(public constant: ConstantService,
              public helper: HelperService,
              private route: Router,
              public store: StoreService,
              private navService: NavigationService,
              private titleCase: TitleCasePipe,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    switch (this.notification.type) {
      case this.constant.NOTIFICATION_TYPE.ALL_LOAN_PROCESS_UPDATED:
        this.notificationInfo.route = '/home/homeBuyingDashboard';
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' '
            + this.titleCase.transform(this. notification.from.lastName) +
            ' updated your home buying process status from ' +
            this.titleCase.transform(this.helper.formatRole(this.notification.meta.previourProcessStatus)) + ' to ' +
            this.titleCase.transform(this.helper.formatRole(this.notification.meta.newProcessStatus));
        break;
      case this.constant.NOTIFICATION_TYPE.BUYER_TARGET_PROPERTY_SET:
        this.notificationInfo.route = '/home/homeBuyingDashboard';
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) +
            ' has set your target property, MLS ID: ' + this.notification.meta.listingId;
        break;
      case this.constant.NOTIFICATION_TYPE.PROFESSIONALS_ADDED_TO_TEAM:
        this.notificationInfo.route = this.store.role === this.constant.role.HOME_INSPECTOR ||
        this.store.role === this.constant.role.INSURANCE ? '/home/quoteRequests' : '/home/borrowers';
        this.notificationInfo.text = 'You have been added to ' + this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) + '\'s team';
        break;
      case this.constant.NOTIFICATION_TYPE.PROFESSIONALS_NEW_QUOTE_REQUEST:
        this.notificationInfo.route = '/home/quoteRequests';
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) + ' sent you new quote request';
        break;
      case this.constant.NOTIFICATION_TYPE.BUYER_QUOTE_REQUEST_ACCEPTED:
        this.notificationInfo.route = '/home/teamMessageBoard?professional=' + this.notification.from._id;
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) + ' accepted your quote request ';
        break;
      case this.constant.NOTIFICATION_TYPE.BUYER_QUOTE_REQUEST_REJECTED:
        this.notificationInfo.route = '';
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) + ' rejected your quote request ';
        break;
      case this.constant.NOTIFICATION_TYPE.BUYER_LENDER_UPDATED_LOAN:
        this.notificationInfo.route = '/home/myLoanDetails';
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) + ' updated your loan details.';
        break;
      case this.constant.NOTIFICATION_TYPE.LENDER_BUYER_UPDATED_LOAN:
        this.notificationInfo.route = '/home/borrowerTransactionDetails/' + this.notification.from._id;
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName) + ' updated his loan details.';
        break;
      case this.constant.NOTIFICATION_TYPE.BUYER_IMPORTANT_DATE_UPDATED:
        this.notificationInfo.route = '';
        this.notificationInfo.text = this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName ) +
            ' has set ' + (this.helper.formatRole(this.notification.meta.dateType)).toLowerCase() + ' to ' +
            this.datePipe.transform(this.notification.meta.date, 'MMM d, yyyy');
        break;
      case this.constant.NOTIFICATION_TYPE.LENDER_TARGET_PROPERTY_SET:
        this.notificationInfo.route = '/home/borrowerTransactionDetails/' + this.notification.from._id;
        this.notificationInfo.text = 'Finalize single loan for ' + this.titleCase.transform(this.notification.from.firstName) + ' ' +
            this.titleCase.transform(this.notification.from.lastName);
        break;
      case this.constant.NOTIFICATION_TYPE.ALL_CALENDAR_EVENT_CREATED:
        this.notificationInfo.route = `/home/calendar?viewEvent=${this.notification.meta.eventId}`;
        this.notificationInfo.text = `${this.titleCase.transform(this.notification.from.firstName) + ' ' +
        this.titleCase.transform(this.notification.from.lastName )} added an event to your calendar`;
        break;
      case this.constant.NOTIFICATION_TYPE.LENDER_PREAPPROVAL_LETTER_GENERATED:
        this.notificationInfo.route = ``;
        this.notificationInfo.text = `${this.titleCase.transform(this.notification.from.firstName) + ' ' +
        this.titleCase.transform(this.notification.from.lastName )} generated pre-approval letter`;
        break;
      case this.constant.NOTIFICATION_TYPE.BUYER_PREAPPROVAL_TEMPLATE_ASSIGNED:
        this.notificationInfo.route = ``;
        this.notificationInfo.text = `${this.titleCase.transform(this.notification.from.firstName) + ' ' +
        this.titleCase.transform(this.notification.from.lastName )} assigned pre-approval template against ` +
            this.titleCase.transform(this.helper.formatRole(this.notification.meta.loanType));
        break;
      default:
        break;
    }
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

}
