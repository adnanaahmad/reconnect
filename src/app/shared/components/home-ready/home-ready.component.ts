import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {StoreService} from '../../../core/store/store.service';
import {ConstantService} from '../../../core/constant/constant.service';
import {ChangePreApprovalLetterComponent} from '../change-pre-approval-letter/change-pre-approval-letter.component';

@Component({
  selector: 'app-home-ready',
  templateUrl: './home-ready.component.html',
  styleUrls: ['./home-ready.component.scss']
})
export class HomeReadyComponent implements OnInit {
  @Input() finance;
  @Input() borrowerId: string;
  @Input() mlsId: number;
  constructor( private modalService: NgbModal,
               private configuration: NgbModalConfig,
               public store: StoreService,
               public constant: ConstantService) {
    configuration.centered = true;
    configuration.container = 'app-transaction-details';
  }

  ngOnInit(): void {
  }
  changeLetter(): void{
    const modalRef = this.modalService.open(ChangePreApprovalLetterComponent);
    modalRef.componentInstance.data = {
      borrowerId: this.borrowerId,
      loanType: this.constant.loanType.HOME_READY,
      mlsId: this.mlsId
    };
    modalRef.result.then((result) => {
      if (result.status === 'yes') {}
    }, error => {
      console.log(error);
    });
  }
}
