import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../core/helper/helper.service';
import {BuyerDashboardService} from '../../../features/roles/buyer/home-buying-dashboard/services/buyer-dashboard.service';
import {ConstantService} from '../../../core/constant/constant.service';
import {take} from 'rxjs/operators';
import {BuyerTransactionDetailsService} from '../../../features/roles/real-estate-agent/transaction-details/services/buyer-transaction-details.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrls: ['./remove-member.component.scss']
})
export class RemoveMemberComponent implements OnInit {
  @Input() member;
  @Input() role;
  @Input() cancelledDeal: boolean;
  constructor(public modal: NgbActiveModal,
              private helper: HelperService,
              private dashboard: BuyerDashboardService,
              private constant: ConstantService,
              private transactionService: BuyerTransactionDetailsService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
  }
  remove(): void{
    this.dashboard.removeTeamMember({role: this.constant.chooseRole[this.role]}).pipe(take(1)).subscribe(res => {
      //console.log(res.result);
      this.modal.close({status: 'yes', data: res.result});
    }, error => {
      console.log(error);
    });
  }
  cancelDeal(): void{
    this.transactionService.cancelDeal({buyerId: this.member._id}).pipe(take(1)).subscribe(res => {
      //console.log(res.result);
      this.toaster.success('Deal cancelled successfully');
      this.modal.close({status: 'yes'});
    }, error => {
      this.toaster.error('Failed to cancel deal');
    });
  }
}
