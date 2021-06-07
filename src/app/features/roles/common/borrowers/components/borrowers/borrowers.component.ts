import { Component, OnInit } from '@angular/core';
import {BorrowersModel} from '../../models/borrowers.model';
import {BorrowersService} from '../../services/borrowers.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {take} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {forkJoin} from 'rxjs';
import {InviteUserComponent} from '../../../../../../shared/components/invite-user/invite-user.component';

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.scss']
})
export class BorrowersComponent implements OnInit {
  borrowers: BorrowersModel = {} as BorrowersModel;
  searchName: FormControl;
  constructor(private borrowerService: BorrowersService,
              public constant: ConstantService,
              private router: Router,
              public store: StoreService,
              private configuration: NgbModalConfig,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute) {
    configuration.centered = true;
    configuration.container = 'app-borrowers';
  }

  ngOnInit(): void {
    this.store.updateBorrowersStatus(this.constant.borrowersStatus[0]);
    this.searchName = new FormControl(null, Validators.required);
    this.getBorrowers();
  }
  getBorrowers(): void{
    this.store.updateProgressBarLoading(true);
    forkJoin([this.borrowerService.getBorrowers(), this.borrowerService.getCancelledDeals()]).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.borrowers.borrower = res[0].result;
      this.borrowers.render = res[0].result;
      this.borrowers.cancelled = res[1].result;
      this.store.updateProgressBarLoading(false);
      this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
        if (params.dealStatus) {
          this.listClick(params.dealStatus);
        }
      });
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  listClick(button): void {
    this.store.updateBorrowersStatus(button);
    window.history.replaceState({}, '', `/home/borrowers?dealStatus=${button}`);
    if (button.toLowerCase() === this.constant.borrowersStatusObject.Cancelled[0].toLowerCase() ||
        button.toLowerCase() === this.constant.borrowersStatusObject.Closed[0].toLowerCase()){
      this.borrowers.render = this.borrowers.cancelled;
    } else {
      this.borrowers.render = this.borrowers.borrower;
    }
  }
  activeStatus(index, value): boolean{
    return index <= this.constant.loanStatus.findIndex(data => data === value);
  }
  viewBorrower(id): void{
    if (this.store.role === this.constant.role.LENDER){
      this.router.navigateByUrl(`/home/borrowerTransactionDetails/${id}`).then();
    } else{
      this.router.navigateByUrl(`/home/buyerTransactionDetails/${id}`).then();
    }
  }
  sendEmail(email: string): void{
    window.location.href = (`mailto:${email}`);
  }
  addNewBorrower(): void{
    const modalRef = this.modalService.open(InviteUserComponent);
    modalRef.componentInstance.role = 'buyer';
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
      }
    }, error => {
      console.log(error);
    });
  }
}
