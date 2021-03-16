import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {RemoveMemberComponent} from '../../popups/remove-member/remove-member.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddMemberComponent} from '../../../../../../shared/components/add-member/add-member.component';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {escapeLabel} from '@swimlane/ngx-charts';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-team-person',
  templateUrl: './team-person.component.html',
  styleUrls: ['./team-person.component.scss']
})
export class TeamPersonComponent implements OnInit, OnChanges {
  @Input() member;
  @Input() role;
  @Input() targetProperty;
  @Output() removeMemberEvent = new EventEmitter<any>();
  @Output() addMemberEvent = new EventEmitter<any>();

  constructor(private modalService: NgbModal,
              configuration: NgbModalConfig,
              private constant: ConstantService,
              private toaster: ToastrService) {
    configuration.centered = true;
    configuration.container = 'app-home-buying-dashboard';
    configuration.animation = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.member.currentValue){
      this.member = changes.member.currentValue.userId;
    }
    console.log(this.member);
  }

  ngOnInit(): void {}

  removeMember(): void {
    const modalRef = this.modalService.open(RemoveMemberComponent);
    modalRef.componentInstance.member = this.member;
    modalRef.componentInstance.role = this.role;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        //console.log(result.data);
        this.removeMemberEvent.emit(result.data);
      }
    }, error => {
      //console.log(error);
    });
  }
  addTeamMember(): void{
    if (this.constant.role.HOME_INSPECTOR === this.constant.chooseRole[this.role] && this.targetProperty) {
      this.addTeamMemberHelper();
    } else if (this.constant.role.INSURANCE === this.constant.chooseRole[this.role] && this.targetProperty) {
      this.addTeamMemberHelper();
    } else if (this.constant.role.HOME_INSPECTOR !== this.constant.chooseRole[this.role]
        && this.constant.role.INSURANCE !== this.constant.chooseRole[this.role]){
      this.addTeamMemberHelper();
    } else {
      this.toaster.error('Subject Property is not set');
    }
  }
  addTeamMemberHelper(): void{
    const modalRef = this.modalService.open(AddMemberComponent);
    modalRef.componentInstance.role = this.role;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        //console.log(result.data);
        this.addMemberEvent.emit(result.data);
      }
    }, error => {
      //console.log(error);
    });
  }
}
