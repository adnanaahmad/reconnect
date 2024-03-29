import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {take} from 'rxjs/operators';
import {ChatService} from '../../../team-message-board/services/chat.service';
import {TeamDataModel} from '../../../team-message-board/models/chat.model';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {CalendarService} from '../../services/calendar.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  @Input() view;
  team: TeamDataModel = {} as TeamDataModel;
  createdBy: string;
  constructor(private helper: HelperService,
              public activeModal: NgbActiveModal,
              private chatService: ChatService,
              public constant: ConstantService,
              public store: StoreService,
              private calendarService: CalendarService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    if (this.view._def.extendedProps.team){
      this.getTeamProfessional();
    }
    this.getEventPublisher();
    console.log(this.view);
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  edit(): void{
    this.activeModal.close({status: 'edit'});
  }
  remove(): void {
    this.calendarService.removeEvent(this.view._def.extendedProps._id).pipe(take(1)).subscribe(res => {
      this.toaster.success('Event deleted');
      this.activeModal.close({status: 'remove'});
    }, error => {
      this.helper.handleApiError(error, 'Failed to delete event');
    });
  }
  getTeamProfessional(): void{
    this.chatService.getTeamById(this.view._def.extendedProps.team).pipe(take(1)).subscribe(res => {
      this.team = res.result;
      this.filterTeam(this.team);
    }, error => {
      console.log(error);
    });
  }
  filterTeam(data): void{
    Object.keys(data).filter(element => {
      if (!this.constant.roleArray.includes(element) || element === this.store.role || !data[element] ||
          (data[element].userId ? !this.view._def.extendedProps.members.includes(data[element].userId._id) :
      !this.view._def.extendedProps.members.includes(data[element]._id))){
        delete data[element];
      }
    });
  }
  getEventPublisher(): void{
    this.calendarService.getUserDataById(this.view._def.extendedProps.createdBy).pipe(take(1)).subscribe(res => {
      this.createdBy = res.result.firstName + ' ' + res.result.lastName;
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch event publisher');
    });
  }
}
