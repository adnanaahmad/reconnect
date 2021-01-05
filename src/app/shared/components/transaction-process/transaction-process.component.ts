import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transaction-process',
  templateUrl: './transaction-process.component.html',
  styleUrls: ['./transaction-process.component.scss']
})
export class TransactionProcessComponent implements OnInit {
  @Input() transaction;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.role);
  }

}
