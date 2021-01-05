import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loan-checkbox',
  templateUrl: './loan-checkbox.component.html',
  styleUrls: ['./loan-checkbox.component.scss']
})
export class LoanCheckboxComponent implements OnInit {
  @Input() loanDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
