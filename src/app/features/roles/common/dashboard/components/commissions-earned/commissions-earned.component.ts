import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commissions-earned',
  templateUrl: './commissions-earned.component.html',
  styleUrls: ['./commissions-earned.component.scss']
})
export class CommissionsEarnedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  commission(val): void{
    console.log(val);
  }

}
