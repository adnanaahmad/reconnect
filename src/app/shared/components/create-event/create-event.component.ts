import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NgbActiveModal, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {ConstantService} from '../../../core/constant/constant.service';
import {HelperService} from '../../../core/helper/helper.service';
import {StoreService} from '../../../core/store/store.service';
import {switchMap, take} from 'rxjs/operators';
import {ChatService} from '../../../features/roles/common/team-message-board/services/chat.service';
import {CreateGroupChatModel} from '../../../features/roles/common/team-message-board/models/chat.model';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';
import {CalendarService} from '../../../features/roles/common/calendar/services/calendar.service';
import {TodoListService} from '../../../features/roles/common/todo-list/services/todo-list.service';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() eventBasedTask: boolean;
  @Input() edit;
  @Input() eventCategories;
  @ViewChildren('member') teamMembers: QueryList<ElementRef>;
  subscription: Array<Subscription>;
  groupMembers: Array<any>;
  teamData: CreateGroupChatModel = {} as CreateGroupChatModel;
  eventForm = this.fb.group({
    title: [null, Validators.required],
    date: [null, Validators.required],
    time: [null, [Validators.required, Validators.pattern('^([0-1][0-9]|[2][0-3])([0-5][0-9])$')]],
    note: [null, Validators.required],
    customEventCategory: this.fb.group({
      status: [null, Validators.required],
      value: [{value: null, disabled: null}, Validators.required],
    }),
    eventCategory: this.fb.group({
      status: [ null, Validators.required],
      value: [{value: null, disabled: null}, Validators.required],
    })
  });

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private helper: HelperService,
              private dateFormat: NgbDateNativeAdapter,
              private ref: ChangeDetectorRef,
              public store: StoreService,
              public constant: ConstantService,
              private chatService: ChatService,
              private calendarService: CalendarService,
              private todoService: TodoListService) {}

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.teamData.selectedTeam = [];
    this.subscription = [];
    this.chooseEventOrCustomCategory();
    if (!this.edit) {
      if (this.store.role === this.constant.role.BUYER){
        this.getTeam();
      } else {
        this.getBuyers();
      }
    }
    // this.eventForm.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
  }
  ngAfterViewInit(): void {
    this.editForm();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

  editForm(): void{
    if (this.edit){
      let time;
      this.eventForm.reset();
      const date = new Date(this.edit._instance.range.start);
      this.eventBasedTask ? time = new Date(this.edit._instance.range.start).toLocaleTimeString('en-US', { hour12: false}) :
        time = new Date(this.edit._instance.range.start).toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' });
      this.eventForm.patchValue({
        title: this.edit._def.title,
        date: this.eventBasedTask ? this.dateFormat.fromModel(date) :
            {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()},
        time: time.substring(0, 2) === '24' ? '00' + time.slice(2) : time,
        note: this.edit._def.extendedProps.note,
      });
      this.eventForm.get('eventCategory').get('status').setValue(true);
      this.eventForm.get('eventCategory').get('value').setValue(this.edit._def.extendedProps.category.title);
      this.groupMembers = this.edit._def.extendedProps.members;
      this.ref.detectChanges();
      if (this.store.role === this.constant.role.BUYER){
        this.getTeam();
      } else {
        if (this.edit._def.extendedProps.team) {
          this.getTeamProfessional();
        }
      }
    }
  }
  onSubmit(): void {
    this.addEvent({data: Object.assign(this.eventForm.value, {team: this.teamData.selectedTeam})});
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  chooseEventOrCustomCategory(): void{
    this.subscription.push(
      this.eventForm.get('eventCategory').get('status').valueChanges.subscribe(result => {
        this.uncheck(result, 'customEventCategory');
        this.toggleInput(result, 'customEventCategory', 'eventCategory');
      })
    );
    this.subscription.push(
      this.eventForm.get('customEventCategory').get('status').valueChanges.subscribe(result => {
        this.uncheck(result, 'eventCategory');
        this.toggleInput(result, 'eventCategory', 'customEventCategory');
      })
    );
  }
  uncheck(result, key): void{
    if (result){
      this.eventForm.patchValue({
        [key]: {
          status: false
        }
      });
    }
  }
  toggleInput(result, inputToggle, input): void{
    result === true ? this.eventForm.get(inputToggle).get('value').disable() :
      this.eventForm.get(inputToggle).get('value').enable();
    this.eventForm.get(input).get('value').enable();
  }
  toggleTeamMember(member): void{
    member = member.userId ?  member.userId._id : member._id;
    this.helper.toggleTeamMember(member, member, this.teamData.selectedTeam);
    console.log(this.teamData.selectedTeam);
  }

  getTeam(): void{
    this.chatService.getTeamsData().pipe(take(1)).subscribe(res => {
      this.getTeamHelper(res);
    }, error => {
      console.log(error);
    });
  }
  getTeamProfessional(): void{
    this.chatService.getTeamById(this.edit._def.extendedProps.team).pipe(take(1)).subscribe(res => {
      this.getTeamHelper(res);
    }, error => {
      console.log(error);
    });
  }
  getTeamHelper(res): void{
    this.teamData.loan = res.result.loan;
    this.teamData.team = {...res.result};
    this.teamData.id  = res.result._id;
    this.filterTeam(this.teamData.team);
    if (this.groupMembers && this.groupMembers.length){
      setTimeout(() => {
        this.highlightUsersInChat();
      }, 1);
    }
    console.log(this.teamData);
  }
  getBuyers(): void{
    this.chatService.getBorrowers().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.teamData.buyers = res.result;
    }, error => {
      console.log(error);
    });
  }
  filterTeam(data): void{
    Object.keys(data).filter(element => {
      if (!this.constant.roleArray.includes(element) || element === this.store.role || !data[element]){
        delete data[element];
      }
    });
  }
  highlightUsersInChat(): void{
    this.teamMembers.forEach(x => {
      const indexValue = this.groupMembers.findIndex(y => y === x.nativeElement.id);
      if (indexValue > -1){
        this.helper.toggleTeamMember(x.nativeElement.id, x.nativeElement.id, this.teamData.selectedTeam);
      }
    });
  }

  addEvent(result): void{
    let randomColor;
    let title;
    let createCategory = false;
    if (result.data.customEventCategory.value){
      randomColor = this.randomColor(this.constant.eventColorDetails);
      title =  result.data.customEventCategory.value;
      createCategory = true;
    } else {
      randomColor = this.eventCategories.find(x => x.title === result.data.eventCategory.value);
      title = result.data.eventCategory.value;
    }
    this.createCalendarEvent(result, randomColor, title, createCategory);
  }
  createCalendarEvent(result, randomColor, eventCategoryTitle, createCategory): void{
    const data = {
      title: result.data.title,
      date: new Date(new DatePipe('en-US').transform(this.dateFormat.toModel(result.data.date), 'yyyy-MM-dd') + ` ${result.data.time.substring(0, 2)}:${result.data.time.substring(2, 4)}`),
      note: result.data.note,
      // category: eventCategory,
      members: result.data.team,
      color: randomColor.color,
      textColor: randomColor.textColor,
      team: this.teamData.id,
      loan: this.teamData.loan
    };
    const category = {
      title: eventCategoryTitle,
      color: randomColor.color,
      colorIcon: randomColor.colorIcon,
      textColor: randomColor.textColor,
    };
    if (this.eventBasedTask) {
      this.saveEventBasedTask(data, category, result, randomColor, eventCategoryTitle, createCategory);
    } else {
      this.saveEvent(data, category, result, randomColor, eventCategoryTitle, createCategory);
    }
  }
  saveEvent(data, category, result, randomColor, eventCategoryTitle, createCategory): void{
    if (createCategory){
      this.calendarService.createCategory(category).pipe(switchMap(res1 => {
        category = res1.result;
        this.eventCategories.push(category);
        return this.edit ?
            this.calendarService.editCalendarEvent({...data, ...{category: res1.result._id}}, this.edit._def.extendedProps._id) :
            this.calendarService.createEvent({...data, ...{category: res1.result._id}});
      })).pipe(take(1)).subscribe(res2 => {
        data['category'] = category;
        data['_id'] = res2.result._id;
        data['createdBy'] = res2.result.createdBy;
        this.activeModal.close({status: 'yes', data: data });
      }, error => {
        console.log(error);
      });
    } else {
      (this.edit ? this.calendarService.editCalendarEvent({...data, ...{category: randomColor._id}}, this.edit._def.extendedProps._id) :
          this.calendarService.createEvent({...data, ...{category: randomColor._id}})).pipe(take(1)).subscribe(res => {
        data['category'] = randomColor;
        data['_id'] = res.result._id;
        data['createdBy'] = res.result.createdBy;
        this.activeModal.close({status: 'yes', data: data });
      }, error => {
        console.log(error);
      });
    }
  }
  saveEventBasedTask(data, category, result, randomColor, eventCategoryTitle, createCategory): void{
    if (createCategory){
      this.calendarService.createCategory(category).pipe(switchMap(res1 => {
        category = res1.result;
        this.eventCategories.push(category);
        return this.edit ?
            this.todoService.editTodo({...data, ...{category: res1.result._id}}, this.edit._def.extendedProps._id) :
            this.todoService.createTodo({...data, ...{category: res1.result._id}, ...{addEvent: true}});
      })).pipe(take(1)).subscribe(res2 => {
        this.activeModal.close({status: 'yes', data: {...data, ...res2.result}});
      }, error => {
        console.log(error);
      });
    } else {
      (this.edit ?
          this.todoService.editTodo({...data, ...{category: randomColor._id}}, this.edit._def.extendedProps._id) :
          this.todoService.createTodo({...data, ...{category: randomColor._id}, ...{addEvent: true}})).pipe(take(1)).subscribe(res => {
          this.activeModal.close({status: 'yes', data: {...data, ...res.result} });
      }, error => {
        console.log(error);
      });
    }
  }
  randomColor(obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }
  getBuyersTeam(member): void{
    this.teamData.selectedButton = member;
    this.teamData.id =  member._id;
    this.teamData.team = {...member};
    this.teamData.loan = member.loan.id;
    this.filterTeam(this.teamData.team);
  }
}
