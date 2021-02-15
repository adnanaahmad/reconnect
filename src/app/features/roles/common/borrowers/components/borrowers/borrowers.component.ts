import { Component, OnInit } from '@angular/core';
import {BorrowersModel} from '../../models/borrowers.model';
import {BorrowersService} from '../../services/borrowers.service';
import {element} from 'protractor';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.scss']
})
export class BorrowersComponent implements OnInit {
  borrowers: BorrowersModel = {} as BorrowersModel;
  constructor(private borrowerService: BorrowersService,
              public constant: ConstantService,
              private router: Router,
              private store: StoreService) { }

  ngOnInit(): void {
    this.borrowers.buttons = ['Pending', 'Pre-Approved', 'Potential', 'Closed'];
    this.borrowers.selectedButton = this.borrowers.buttons[0];
    this.getBorrowers();
  }
  getBorrowers(): void{
    this.borrowerService.getBorrowers().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.borrowers.borrower = res.result;
    }, error => {
      console.log(error);
    });
  }
  listClick(button): void {
    this.borrowers.selectedButton = button;
  }
  activeStatus(index, value): boolean{
    return index <= this.constant.loanStatus.findIndex(data => data === value);
  }
  viewBorrower(id): void{
    if (this.store.role === this.constant.role.LENDER){
      this.router.navigateByUrl(`/home/borrowerTransactionDetails?id=${id}`).then();
    } else{
      this.router.navigateByUrl(`/home/buyerTransactionDetails?id=${id}`).then();
    }
  }
}
