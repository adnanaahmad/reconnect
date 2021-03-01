import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {ChatService} from '../../services/chat.service';
import {CreateGroupChatModel} from '../../models/chat.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss']
})
export class CreateGroupChatComponent implements OnInit {
  @ViewChildren('member') teamMembers: QueryList<ElementRef>;
  teamData: CreateGroupChatModel = {} as CreateGroupChatModel;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private helper: HelperService,
              private chatService: ChatService,
              public store: StoreService,
              public constant: ConstantService,
              private toaster: ToastrService) {}

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.initializeForm();
    if (this.store.role === this.constant.role.BUYER){
      this.getTeam();
    } else {
      this.getBuyers();
    }
  }
  initializeForm(): void{
    this.teamData.groupForm = this.fb.group({
      title: [null, Validators.required],
    });
    this.teamData.selectedTeam = [];
  }
  onSubmit(): void {
    if (!this.teamData.selectedTeam.length) {
      this.toaster.error('Select atleast one team member');
    }
    if (this.teamData.groupForm.valid && this.teamData.selectedTeam.length) {
      const data = {
        teamId: this.teamData.id,
        members: this.teamData.selectedTeam,
        title: this.teamData.groupForm.get('title').value
      };
      this.chatService.createGroupConversation(data).subscribe(res => {
        console.log(res);
        this.activeModal.close({status: 'yes', data: res});
      }, error => {
        console.log(error);
      })
    } else {
      this.teamData.groupForm.markAllAsTouched();
    }
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  toggleTeamMember(i, member): void{
    member = this.store.role === this.constant.role.BUYER ? member.userId._id : member._id;
    this.helper.toggleTeamMember(i, member, this.teamData.selectedTeam);
    console.log(this.teamData.selectedTeam);
  }
  getTeam(): void{
    this.chatService.getTeamsData().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.teamData.team = res.result;
      this.teamData.id  = res.result._id;
      this.filterTeam(this.teamData.team);
      console.log(this.teamData);
    }, error => {
      console.log(error);
    });
  }
  getBuyers(): void{
    this.chatService.getBorrowers().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.teamData.buyers = res.result;
    }, error => {
      console.log(error);
    });
  }
  getBuyersTeam(member): void{
    this.teamData.selectedButton = member;
    this.teamData.id =  member._id;
    this.teamData.team = member;
    this.filterTeam(this.teamData.team);
  }
  filterTeam(data): void{
    Object.keys(data).filter(element => {
      if (!this.constant.roleArray.includes(element) || element === this.store.role){
        delete data[element];
      }
    });
  }
}