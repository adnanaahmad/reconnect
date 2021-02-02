import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {BuyerDashboardService} from '../../services/buyer-dashboard.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrls: ['./remove-member.component.scss']
})
export class RemoveMemberComponent implements OnInit {
  @Input() member;
  @Input() role;
  constructor(public modal: NgbActiveModal,
              private helper: HelperService,
              private dashboard: BuyerDashboardService,
              private constant: ConstantService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
  }
  remove(): void{
    this.dashboard.removeTeamMember({role: this.constant.chooseRole[this.role]}).subscribe(res => {
      //console.log(res.result);
      this.modal.close({status: 'yes', data: res.result});
    }, error => {
      console.log(error);
    });
  }
}
