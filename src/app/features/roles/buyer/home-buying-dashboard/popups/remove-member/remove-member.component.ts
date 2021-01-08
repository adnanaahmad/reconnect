import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrls: ['./remove-member.component.scss']
})
export class RemoveMemberComponent implements OnInit {
  @Input() member;
  constructor(public modal: NgbActiveModal, private helper: HelperService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    //console.log(this.member);
  }
  remove(): void{
    this.modal.close({status: 'yes', data: this.member});
  }
}
