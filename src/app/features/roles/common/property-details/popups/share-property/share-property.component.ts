import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {CreateGroupChatModel} from '../../../team-message-board/models/chat.model';
import {ChatService} from '../../../team-message-board/services/chat.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {environment} from '../../../../../../../environments/environment';
import {PropertyDetailsService} from '../../services/property-details.service';

@Component({
  selector: 'app-share-property',
  templateUrl: './share-property.component.html',
  styleUrls: ['./share-property.component.scss']
})
export class SharePropertyComponent implements OnInit {
  @Input() mlsId: string;
  @ViewChildren('member') teamMembers: QueryList<ElementRef>;
  teamData: CreateGroupChatModel = {} as CreateGroupChatModel;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private helper: HelperService,
              private propertyDetailsService: PropertyDetailsService,
              public store: StoreService,
              public constant: ConstantService,
              private toaster: ToastrService,
              private chatService: ChatService) {}

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.initializeForm();
    if (this.store.role === this.constant.role.BUYER){
      this.getTeam();
    } else {
      this.getBuyersAndGroups();
    }
  }
  initializeForm(): void{
    this.teamData.groupForm = this.fb.group({
      message: [null, Validators.required],
    });
    this.teamData.selectedTeam = [];
  }
  onSubmit(): void {
    if (!this.teamData.selectedTeam.length) {
      this.toaster.error('Select atleast one team member');
    }
    if (this.teamData.selectedTeam.length) {
      const data = {
        to: this.teamData.selectedTeam,
        text: this.teamData.groupForm.get('message').value,
        files: [],
        type: this.constant.chatMessageType.MESSAGE_TYPE_SHARE_PROPERTY,
        shareMeta: {
          propertyUrl: `${environment.clientUrl}/home/propertyDetails/${this.mlsId}`,
        }
      };
      this.propertyDetailsService.shareOrBookProperty(data).pipe(take(1)).subscribe(res => {
        console.log(res);
        this.activeModal.close({status: 'yes', data: res.result});
      }, error => {
        console.log(error);
      });
    } else {
      this.teamData.groupForm.markAllAsTouched();
    }
  }
  onSubmitProfessional(): void {
    if (!this.teamData.selectedGroups.length && !this.teamData.selectedBuyers.length) {
      this.toaster.error('Select atleast one member');
    }
    if (this.teamData.selectedGroups.length || this.teamData.selectedBuyers.length) {
      const data = {
        toUsers: this.teamData.selectedBuyers,
        toGroupConversations: this.teamData.selectedGroups,
        text: this.teamData.groupForm.get('message').value,
        files: [],
        type: this.constant.chatMessageType.MESSAGE_TYPE_SHARE_PROPERTY,
        shareMeta: {
          propertyUrl: `${environment.clientUrl}/home/propertyDetails/${this.mlsId}`,
        }
      };
      this.propertyDetailsService.sharePropertyProfessionals(data).pipe(take(1)).subscribe(res => {
        console.log(res);
        this.activeModal.close({status: 'yes', data: res.result});
      }, error => {
        console.log(error);
      });
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
  toggleBuyer(i, member): void{
    console.log(member);
    member = member.buyer._id;
    this.helper.toggleTeamMember(i, member, this.teamData.selectedBuyers);
    console.log(this.teamData.selectedBuyers);
  }
  toggleGroup(i, member): void{
    console.log(member);
    member = member._id;
    this.helper.toggleTeamMember(i, member, this.teamData.selectedGroups);
    console.log(this.teamData.selectedGroups);
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
  getBuyersAndGroups(): void{
    this.teamData.selectedBuyers = [];
    this.teamData.selectedGroups = [];
    forkJoin([this.chatService.getBorrowers(), this.chatService.getConversation()]).pipe(take(1)).subscribe(res => {
        console.log('fork join', res);
        this.teamData.buyers = res[0].result;
        this.teamData.groups = (res[1].result.filter(x => x.type === this.constant.conversationType.GROUP)).filter( x => {
          return x.members.findIndex(y => y._id === this.store.userId) !== -1;
        });
    }, error => {
      console.log(error);
    });
  }
  // getBuyersTeam(member): void{
  //   this.teamData.selectedButton = member;
  //   this.teamData.id =  member._id;
  //   this.teamData.team = member;
  //   this.filterTeam(this.teamData.team);
  // }
  filterTeam(data): void{
    Object.keys(data).filter(element => {
      if (!this.constant.roleArray.includes(element) || element === this.store.role || !data[element]){
        delete data[element];
      }
    });
  }
}
