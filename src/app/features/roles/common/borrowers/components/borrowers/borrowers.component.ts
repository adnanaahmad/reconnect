import { Component, OnInit } from '@angular/core';
import {BorrowersModel} from '../../models/borrowers.model';
import {BorrowersService} from '../../services/borrowers.service';
import {element} from 'protractor';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {take} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {CreateGroupChatComponent} from '../../../team-message-board/popups/create-group-chat/create-group-chat.component';
import {AddNewBorrowerComponent} from '../../popups/add-new-borrower/add-new-borrower.component';

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
              private modalService: NgbModal) {
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
    this.borrowerService.getBorrowers().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.borrowers.borrower = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  listClick(button): void {
    this.store.updateBorrowersStatus(button);
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
    window.open(`mailto:${email}`);
  }
  addNewBorrower(): void{
    const modalRef = this.modalService.open(AddNewBorrowerComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
      }
    }, error => {
      console.log(error);
    });
  }
}
