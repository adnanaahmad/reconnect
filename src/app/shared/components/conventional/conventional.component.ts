import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-conventional',
  templateUrl: './conventional.component.html',
  styleUrls: ['./conventional.component.scss']
})
export class ConventionalComponent implements OnInit {
  @Input() finance;
  constructor() { }

  ngOnInit(): void {
  }

}
