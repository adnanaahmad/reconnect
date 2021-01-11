import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {RemoveMemberComponent} from '../../popups/remove-member/remove-member.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddMemberComponent} from '../../popups/add-member/add-member.component';

@Component({
  selector: 'app-team-person',
  templateUrl: './team-person.component.html',
  styleUrls: ['./team-person.component.scss']
})
export class TeamPersonComponent implements OnInit {
  @Input() member;
  @Input() role;
  @Output() removeMemberEvent = new EventEmitter<any>();
  @Output() addMemberEvent = new EventEmitter<any>();

  constructor(private modalService: NgbModal, configuration: NgbModalConfig) {
    configuration.centered = true;
    configuration.container = 'app-home-buying-dashboard';
    configuration.animation = false;
  }

  ngOnInit(): void {
  }

  removeMember(): void {
    const modalRef = this.modalService.open(RemoveMemberComponent);
    modalRef.componentInstance.member = this.member;
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
