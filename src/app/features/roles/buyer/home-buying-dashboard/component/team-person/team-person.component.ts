import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {RemoveMemberComponent} from '../../popups/remove-member/remove-member.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team-person',
  templateUrl: './team-person.component.html',
  styleUrls: ['./team-person.component.scss']
})
export class TeamPersonComponent implements OnInit {
  @Input() member;
  @Input() role;
  @Output() removeMemberEvent = new EventEmitter<any>();
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
}
